<template>
  <div>
    <b-container>
      <b-card-group deck>
        <b-card header="Vue App 4 Peaks">
          <b-row>
            <b-col v-if="people">
              <div v-if="!selectedPerson">
                <b-list-group v-for="person in people" :key="person.id">
                  <b-list-group-item button @click="selectPerson(person)">
                    <div :key="person.name" class="name">
                      <b>{{ person.name }}</b>
                    </div>
                    <div class="description">{{ person.description }}</div>
                  </b-list-group-item>
                </b-list-group>
              </div>
              <PersonDetail
                :person="selectedPerson"
                @save="savePerson"
                @cancel="cancelPerson"
                v-if="selectedPerson"
              />
              <div class="mt-4 mb-4 text-center" v-show="message">
                <b-spinner type="grow"></b-spinner>
                <p>{{ message }}</p>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import { lifecycleHooks, data } from "../shared";
import PersonDetail from "@/components/PersonDetail";

export default {
  name: "People",
  data() {
    return {
      people: [],
      selectedPerson: undefined,
      message: ""
    };
  },
  components: {
    PersonDetail
  },
  mixins: [lifecycleHooks],
  async created() {
    await this.loadPeople();
  },
  methods: {
    async loadPeople() {
      this.people = [];
      this.message = "Getting the people...";

      this.people = await data.getPeople();

      this.message = "";
    },
    cancelPerson() {
      this.selectedPerson = undefined;
    },
    savePerson(person) {
      const index = this.people.findIndex(p => p.id === person.id);
      this.people.splice(index, 1, person);
      this.people = [...this.people];
      this.selectedPerson = undefined;
    },
    selectPerson(person) {
      this.selectedPerson = person;
    }
  }
};
</script>
