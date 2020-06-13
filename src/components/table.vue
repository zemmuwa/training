<template>
<div class="shadow-2 q-ma-lg full-height">
  <slot name="awal"></slot>
<table border="1px">
    <thead :class="warna">
      <tr>
        <th v-for="(data,index) in column" :key="index">
          {{data}}
        </th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr class="cursor-pointer" @click="clickData(index)" v-for="(d,index) in data" :key="index">
        <td v-for="(e,index2) in d" :key="index2">
          {{e}}
        </td>
        <td>
          <button @click="hapusData(index)">Hapus</button>
        </td>
      </tr>
    </tbody>
  </table>
  <slot></slot>
  <button v-if="isCanChange" @click="changeColor()">Change Color</button>
  <slot name="akhir"></slot>
</div>
</template>

<script>
export default {
  // props: ['column', 'data', 'isCanChange'],
  props: {
    column: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    data: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    isCanChange: {
      type: Boolean,
      default: false
    }

  },
  // name: 'ComponentName',
  data () {
    return {
      warna: ''
    }
  },
  methods: {
    hapusData (index) {
      // this.data.splice(index, 1)
      this.$emit('onHapus', this.data[index]._id)
    },
    clickData (index) {
      // this.data.splice(index, 1)
      this.$emit('onClick', this.data[index]._id)
    },
    changeColor () {
      if (!this.warna || this.warna === 'bg-biru') {
        this.warna = 'bg-merah'
      } else if (this.warna === 'bg-merah') {
        this.warna = 'bg-biru'
      }
    }
  }
}
</script>

<style>
.bg-merah{
  background-color: red;
}
.bg-biru{
  background-color: blue;
}

</style>
