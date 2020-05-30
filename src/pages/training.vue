<template>
  <q-page padding>
    <p class="text-body1 text-red-7">
      asaasasasasasasasas
    </p>
    <input type="text" v-model="msg" />
    <br />
    <input type="radio" v-model="gender" value="Laki-laki" />Laki-Laki
    <input type="radio" v-model="gender" value="Perempuan" />Perempuan
    <br />
    <div v-for="(data, index) in arrHooby" :key="index">
      <template v-if="data.status == 'aktif'">
        <input type="checkbox" v-model="hobby" :value="data.value" />
        {{ data.value }}
      </template>
      <template v-else-if="data.status == 'sedang'">
        {{ data.value }}
      </template>
      <template v-else>
        <input type="checkbox" v-model="hobby" :value="data.value" disabled />{{
          data.value
        }}
      </template>
    </div>
    <p>
      {{ msg }}
    </p>
    <button @click="alertNilaiGender('jenis kelamin saya:')">
      Alert Gender
    </button>
    <p>{{ getTglNow }}</p>
    <table-ku-yg-cantik
      @onHapus="callback => notifHapus(callback)"
      :column="['Value', 'Status']"
      :data="arrHooby"
      isCanChange
    >
      <template slot="akhir">
        ini akhir
      </template>
      <button>hallo</button>
      <template slot="awal">
        ini awal
      </template>
    </table-ku-yg-cantik>
    <q-btn @click="tombolKu()" ref="tombolKu" color="primary" dense icon="mail">
      kaksa
    </q-btn>
  </q-page>
</template>

<script>
import TableKuYgCantik from 'components/table.vue'
export default {
  components: { TableKuYgCantik },
  data () {
    return {
      msg: 'hallo world jasa',
      gender: '',
      hobby: [],
      arrHooby: [
        { value: 'Mancing', status: 'aktif' },
        { value: 'Renang', status: 'sedang' },
        { value: 'Tidur', status: 'non-aktif' }
      ]
    }
  },
  mounted () {

    // alert('hallo')
  },
  computed: {
    getTglNow () {
      return Date.now()
    }
  },
  watch: {
    gender (newVal, oldVal) {
      alert(`new = ${newVal} old= ${oldVal}`)
    }
  },
  methods: {
    alertNilaiGender (msg) {
      alert(`${msg} ${this.gender}`)
    },
    notifHapus (index) {
      this.$refs.tombolKu.click()
      // alert(`Hapus Berhasil pada index ${index}`)
    },
    tombolKu () {
      alert('aku di pencet')
    }
  },
  name: 'PageTraining'
}
</script>
