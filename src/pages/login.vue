<template>
  <q-page padding class="flex flex-center">
    <!-- content -->
    <q-btn color="primary" icon="check" label="Login" @click="doLogin()" />
    <q-btn color="primary" icon="check" label="Register" @click="doRegister()" />
    <q-btn color="primary" icon="check" label="Logout" @click="doLogout()" />
    <q-btn color="primary" icon="check" label="cekUser" @click="cekUser()" />
    {{pegawai}}
  </q-page>
</template>

<script>
import { auth, StoreDB } from 'boot/firestore'
export default {
  name: 'LoginPage',
  data () {
    return {
      pegawai: []
    }
  },
  firestore: {
    pegawai: StoreDB.collection('pegawai')
  },
  methods: {
    async doLogin () {
      try {
        const respond = await auth.signInWithEmailAndPassword('zemmy@gmail.com', '12345678')
        this.$router.push('/training')
        console.log(respond)
      } catch (error) {
        alert(error.message)
        console.log(error)
      }
    },
    async doRegister () {
      try {
        const respond = await auth.createUserWithEmailAndPassword('zemmy@gmail.com', '12345678')
        console.log(respond)
      } catch (error) {
        alert(error.message)
        console.log(error)
      }
    },
    cekUser () {
      console.log(auth.currentUser)
    },
    async doLogout () {
      await auth.signOut()
    }
  }
}
</script>
