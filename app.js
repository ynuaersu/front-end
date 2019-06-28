var d  = new Date();
let year = d.getFullYear();
let month = d.getMonth() - 1;
let day = d.getDay().toString();
if(d.getDay() == 31){
	day = '30';
}else if(d.getDay()<10){
	day = '0' + day;
}
if(d.getMonth()<10){
	month = '0' + month;
}


alert('https://api.github.com/search/repositories?q=created:<'+year+'-'+month+'-'+day+'&sort=stars&order=desc');
const vrep = new Vue({
    el: '#container',
    data: {
      items: []
    },
    mounted() {
      axios.get('https://api.github.com/search/repositories?q=created:<'+year+'-'+month+'-'+day+'&sort=stars&order=desc')
              .then(res => {this.items = res.data.items});
    }, 
});