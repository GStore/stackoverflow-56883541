<template>
  <div class="hello">
    <div>Total items: {{ totalItems }}</div>
    
    <div class="addForm">
      <label>title:</label> <input v-model="item.title" /><br />
      <label>created:</label> <input v-model="item.created" /><br />
      <label>updated:</label> <input v-model="item.updated" /><br />
      <button class="add" @click="saveItemToDb">add</button> 
    </div>
    <hr class="clear"/>
    <div>
      <div>Get Record Num: <input class="recordnum" v-model="recordNum"><button @click="retrieveItemToDb">get</button></div>
      <div class="retrieved">Record retrieved: </div>
      {{ recordRetrieved }}
    </div>
  </div>  
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      totalItems: 0,
      recordNum: 1,
      recordRetrieved: null,
      item: {
        title: 'test',
        created: '2018-01-01',
        updated: '2019-01-01'
      },      
    }
  },
  async beforeMount(){
    this.totalItems = await this.getTotalItems();
  },
  methods: {
    saveItemToDb: async function() {
      const total = await this.getTotalItems();
      const item = {
        id: total+1, 
        title: this.item.title, 
        created_at: this.item.created + total, 
        updated_at: this.item.updated
      };
      this.$db.tests.add(item);
      this.totalItems = await this.getTotalItems();
    },
    retrieveItemToDb: async function() {
      this.recordRetrieved = await this.$db.tests.get(parseInt(this.recordNum));
    },
    getTotalItems: async function(){
      const total = await this.$db.tests.count();
      return total;
    },
  },  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

button.add {  
  margin-top:10px;
}
.hello {
  width: 350px;
  margin: auto;
  
}
.hello div{
  text-align: left;
}
.hello div label { 
  width: 100px;
  display: inline-block;
}
.hello div input { 
  margin-left: 20px;
}
.clear {
  clear:both;
}
.addForm{
  padding:10px;
}
.recordnum{
  width:30px;
  margin-right:10px;
}
.retrieved{
  margin-top:10px;
}
</style>
