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
    <button class="rounded-borders" @click="alertNilaiGender('jenis kelamin saya:')">
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
    <q-btn @click="addUser()" ref="tombolKu" color="primary" dense icon="mail">
      kaksa
    </q-btn>
    <div  class="non-selectable">

    {{user}}
    </div>
    <!-- <div v-for="(item,index) in userHobby" :key="'userhobby'+index">{{item}}</div> -->
    <q-btn color="primary" icon="check" label="Logout" @click="logout()" />
    <upload-custom/>
  </q-page>
</template>

<script>
import TableKuYgCantik from 'components/table.vue'
import uploadCustom from 'components/upload.vue'
import { StoreDB, auth } from 'boot/firestore'
export default {
  components: { TableKuYgCantik, uploadCustom },
  data () {
    return {
      msg: 'hallo world jasa',
      gender: '',
      hobby: [],
      arrHooby: [
        { value: 'Mancing', status: 'aktif' },
        { value: 'Renang', status: 'sedang' },
        { value: 'Tidur', status: 'non-aktif' }
      ],
      user: [],
      userHobby: []
    }
  },
  async mounted () {
    this.userHobby = await this.getDataUserHobby()
    console.log(await this.$axios.get('https://crudcrud.com/api/4adcba9062604e9996962e8c5ad6b346/unicorns'))
  },
  firestore: {
    user: StoreDB.collection('user_hobby')
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
    },
    updateUser (index) {
      const user = { ...this.user[index] }
      alert(user.id)
      user.Nama = 'Meida'
      StoreDB.collection('user')
        .doc(user.id)
        .set(user)
        .then(() => {
          console.log('user updated!')
        })
    },
    addUser () {
      StoreDB.collection('user').add({
        id: '',
        Nama: 'xxx',
        Umur: '12'
      })
    },
    async logout () {
      await auth.signOut()
      this.$router.replace({ path: '/login' })
    },
    async getDataUserHobby () {
      const querySnapshot = await StoreDB.collection('user_hobby')
        .get()
      const result = querySnapshot.docs.map(async doc => {
        const dataUser = await this.getDataUser(doc.data().userID)
        return { ...doc.data(), id: doc.id, user: dataUser }
      })
      return await Promise.all(result)
    },
    async getDataUser (id = null) {
      let response
      let result
      const querySnapshot = StoreDB.collection('user')
      if (id) {
        response = await querySnapshot.doc(id).get()
        if (response.exists) {
          result = response.data()
        } else {
          result = null
        }
      } else {
        response = await querySnapshot.get()
        result = response.docs.map(doc => doc.data())
      }
      return result
    }
  },
  name: 'PageTraining'
}
</script>
