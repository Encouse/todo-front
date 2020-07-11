<template>
  <v-data-iterator
  :items="items"
  :items-per-page.sync="itemsPerPage"
  :page="page"
  :search="search"
  :sort-by="sortBy.toLowerCase()"
  :sort-desc="sortDesc"
  hide-default-footer
>
    <template v-slot:header>
      <v-toolbar
        dark
      >
        <v-text-field
          v-if = "pb"
          v-model="search"
          clearable
          flat
          dense
          outlined
          hide-details
          label = 'Поиск'
        ></v-text-field>
        <v-menu
          v-else
          v-model = 'searchmenu'
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              x-small
              dark
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
            <v-card
              height = '88'
            >
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="search"
                      clearable
                      flat
                      dense
                      outlined
                      hide-details
                      label = 'Поиск'
                    ></v-text-field>
                  </v-col>
                  <v-col cols = '2'>
                    <v-btn
                      fab
                      x-small
                      dark
                      outlined
                      @click = 'searchmenu = false'
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-menu>
        <template >
        <v-spacer></v-spacer>
          <v-select
            v-if = "pb"
            v-model="sortBy"
            flat
            dense
            outlined
            hide-details
            :items="keys"
            label="Сортировка"
          ></v-select>
          <v-menu
            v-else
            v-model = 'sortmenu'
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                fab
                x-small
                dark
              >
                <v-icon>mdi-sort</v-icon>
              </v-btn>
            </template>
            <v-card
              height = '88'
            >
              <v-container>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="sortBy"
                      flat
                      dense
                      outlined
                      hide-details
                      :items="keys"
                      label="Сортировка"
                      @click = "menu = false"
                    ></v-select>
                  </v-col>
                  <v-col cols = '2'>
                    <v-btn
                      fab
                      x-small
                      dark
                      outlined
                      @click = 'sortmenu = false'
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
              </v-row>
              </v-container>
            </v-card>
          </v-menu>
        <v-spacer></v-spacer>
          <v-btn-toggle
            v-model="sortDesc"
            mandatory
          >
            <v-btn
              large
              depressed
              color="blue"
              outlined
              :value="false"
            >
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn
              large
              depressed
              color="blue"
              outlined
              :value="true"
            >
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn
            fab
            small
            outlined
            @click = 'startCreation'
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
    </template>

    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card @click = 'openDetailItem(item)'>
            <v-card-title class="subheading font-weight-bold">{{ item.title }}</v-card-title>

            <v-divider></v-divider>

            <v-list>
              <v-list-item
                v-for="(key, index) in filteredKeys"
                :key="index"
              >
                <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                  {{ key }}:
                </v-list-item-content>

                <v-list-item-content
                                    class="align-end"
                                    :class="{ 'blue--text': sortBy === key }">
                                    {{ item[key.toLowerCase()] }}
                                  </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col>
          <template>
            <div class="text-center">
              <v-overlay :value="overlay">
                <ItemWindow
                 :item = 'detailItem'
                 :create = 'create'
                 @event-created = 'createEvent'
                 @close-overlay = 'closeOverlay'
                 />
              </v-overlay>
            </div>
          </template>
        </v-col>
      </v-row>
    </template>


    <template v-slot:footer>
      <v-row class="mt-2" align="center" justify="center">
        <span class="grey--text">{{bp ? 'Items per page' : ''}}</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              outlined
              fab
              color="primary"
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ itemsPerPage }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              @click="updateItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <span
          class="mr-4
          grey--text"
        >
          Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-btn
          fab
          dark
          color="blue darken-3"
          class="mr-1"
          small
          outlined
          @click="formerPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          color="blue darken-3"
          class="ml-1"
          small
          outlined
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script>
import ItemWindow from '@/components/windows/ItemWindow'
  export default {
    components: {
      ItemWindow
    },
    mounted() {
      this.getEvnsFromStore()
    },
    watch: {
      items() {
        if (this.items.length === 0) {
          this.items.push({title: 'Нет евентов!', text: 'Клинкните плюс в правом верхнем углу'})
        }
      },
      filtering(val) {
        switch(val) {
          case 'Этот месяц':
            break
          case 'Эта неделя':
            break
          case 'Этот день':
            break
        }
      }
    },
    data () {
      return {
        updateCounter: 0,
        searchmenu: false,
        sortmenu: false,
        overlay: false,
        create: false,
        detailItem: null,
        newEventTitle: null,
        newEventText: null,
        newEventDateStart: null,
        newEventDateEnd: null,
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        bp: this.$vuetify.breakpoint.mdAndUp,
        sortBy: 'Title',
        keys: [
          'Title',
          'Text',
          'datetime_end'
        ],
        filterkeys: [
          'Этот месяц',
          'Эта неделя',
          'Этот день',
        ],
        filtering: '',
        items: [],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
      filteredItems () {
        return this.items.map((val) => val.datetime_start)
      }
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      getEvnsFromStore () {
        this.$store.dispatch('fetchEvents')
        .then(() => {
          this.items = this.$store.getters.getEvents
        })
      },
      openDetailItem (item) {
        this.detailItem = item
        this.create = false
        this.overlay = true
      },
      startCreation () {
        this.detailItem = {}
        this.create = true
        this.overlay = true
      },
      createEvent () {
        this.create = false
        this.getEvnsFromStore()
        this.closeOverlay()
      },
      closeOverlay () {
        this.create = false
        this.overlay = false
        this.getEvnsFromStore()
      },
      updateEvent(i, evn) {
        console.log('adawddaw');
        this.items[i] = evn
      }
    },
  }
</script>
