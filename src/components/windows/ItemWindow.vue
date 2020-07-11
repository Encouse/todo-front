<template>
  <v-row align="center">
    <v-col>
          <v-card text max-width = '800'>
            <v-card-title>
              {{create ? 'Создать' : 'Редактировать'}}
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="closeOverlay"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-row class="mb-4" align="center">
                <v-col>
                  <v-text-field
                    text
                    v-model = 'title'
                    outlined
                    placeholder = 'Заголовок'
                  >
                  </v-text-field>
                </v-col>
              </v-row>
                <v-textarea

                  v-model = 'text'
                  name="input-7-1"
                  :label="'Событие ' + title"
                  hint="Редактировать событие"
                  placeholder = 'Текст события'
                  dense
                  outlined
                ></v-textarea>
                <v-col>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Дата"
                        outlined
                        dense
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-col>
                  <v-col>
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="time"
                          label="Время"
                          dense
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
              <div v-if = '!create' class = 'redact-buttons'>
                <v-btn

                  @click = 'deleteEvent'
                  fab
                  text
                  outlined
                  dark
                  small
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              <v-btn
                  @click = 'saveEvent'
                  fab
                  text
                  outlined
                  dark
                  small
                >
                <v-icon>mdi-content-save-outline</v-icon>
              </v-btn>
            </div>
            <div v-else class = 'redact-buttons'>
              <v-btn
                  v-if = '!created'
                  @click = 'addEvent'
                  fab
                  text
                  outlined
                  small
                >
                <v-icon>mdi-content-save-outline</v-icon>
              </v-btn>
              <v-btn
                  v-else
                  @click = 'closeOverlay'
                  fab
                  text
                  outlined
                  small
                >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            </v-card-text>
          </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
export default {
  name: 'item-window',
  props: {
    item: Object,
    index: [String, Number],
    create: Boolean,
  },
  mounted() {
    this.text = this.item.text
    this.title = this.item.title
    this.date = this.item.datetime_end.match(/\d{4}-\d{2}-\d{2}/g)[0]
    this.time = this.item.datetime_end.match(/\d{2}:\d{2}/g)[0]
  },
  data() {
    return {
      date: null,
      menu: false,
      modal: false,
      menu2: false,
      modal2: false,
      time: null,
      text: null,
      title: null,
      created: false,
    }
  },
  computed: {
    datetime: function() {
      let datetime = `${this.date}T${this.time}:00`
      let dtobj = new Date(datetime)
      return moment(dtobj).format()
    }
  },
  watch: {
    date(val) {
      console.log(val)
    },
    time(val) {
      console.log(val);
    }
  },
  methods: {
    saveEvent: function() {
      let event = {
        id: this.item.id,
        text: this.text,
        title: this.title,
        datetime_end: this.datetime,
        datetime_start: this.item.datetime_start,
      }
      this.$store.dispatch('changeEvent', event)
      .then(() => {
        this.$emit('event-changed', this.index, event)
        this.$emit('close-overlay')
      })
      .catch((err) => {
        console.log(err);
        this.$emit('close-overlay')
      })
    },
    deleteEvent: function() {
      this.$store.dispatch('deleteEvent', this.item.id)
      .then(() => {
        this.$emit('close-overlay')
      })
      .catch(err => {console.log(err.response)})
    },
    addEvent: function() {
      let event = {
        text: this.text,
        title: this.title,
        datetime_end: this.datetime,
      }
      this.created = true
      this.$store.dispatch('createEvent', event)
      .then(() => {
        this.$emit('event-created', event)
      })
    },
    closeOverlay() {
      this.created = false
      this.$emit('close-overlay')
    }
  }
}
</script>

<style scoped>
.title {
  margin-left: 6%;
}
.redact-buttons {
  margin-top: 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
