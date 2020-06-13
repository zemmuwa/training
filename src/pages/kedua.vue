<template>
  <q-page padding class="flex flex-center">
    <table-ku-yg-cantik @onClick="val=>goToViewPerson(val)" @onHapus="val => deletePerson(val)" :data="dataPerson" :column="kolom"></table-ku-yg-cantik>
     <q-form
      @submit="savePerson()"
      @reset="resetFormInput()"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="nama"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="umur"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      <q-input
        filled
        v-model="warna"
        label="Your color *"
        hint="color"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import TableKuYgCantik from 'components/table.vue'
export default {
  components: { TableKuYgCantik },
  name: 'KeduaPage',
  data () {
    return {
      dataPerson: [],
      kolom: ['id', 'nama', 'umur', 'warna'],
      nama: '',
      umur: '',
      warna: ''
    }
  },
  methods: {
    async getPerson () {
      this.$q.loading.show({ spinnerColor: 'blue' })
      const respond = await this.$axios.get('https://crudcrud.com/api/4adcba9062604e9996962e8c5ad6b346/unicorns')
      this.$q.loading.hide()
      if (respond.statusText === 'OK') {
        this.dataPerson = respond.data
      } else {
        alert('server error')
      }
    },
    async savePerson () {
      const param = {
        name: this.nama,
        age: this.umur,
        colour: this.warna
      }
      this.$q.loading.show({ spinnerColor: 'blue' })
      const respond = await this.$axios.post('https://crudcrud.com/api/4adcba9062604e9996962e8c5ad6b346/unicorns', param)
      this.$q.loading.hide()
      if (respond.statusText === 'Created') {
        this.getPerson()
        this.resetFormInput()
      } else {
        alert('server error')
      }
    },
    async deletePerson (id) {
      this.$q.loading.show({ spinnerColor: 'blue' })
      const respond = await this.$axios.delete(`https://crudcrud.com/api/4adcba9062604e9996962e8c5ad6b346/unicorns/${id}`)
      this.$q.loading.hide()
      if (respond.statusText === 'OK') {
        this.getPerson()
      } else {
        alert('server error')
      }
    },
    resetFormInput () {
      this.nama = ''
      this.umur = ''
      this.warna = ''
    },
    goToViewPerson (id) {
      this.$router.push('/kedua/' + id)
    }
  },
  mounted () {
    this.getPerson()
  }
}
</script>

<style>
.kotak {
  width: 100px;
  height: 100px;
  background-color: red;
}
.kotak2 {
  width: 150px;
  height: 200px;
  background-color: red;
}
.height500 {
  height: 500px;
}
</style>
