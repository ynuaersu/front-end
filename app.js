var d  = new Date();
var page = 1;
let year = d.getFullYear();
let month = d.getMonth();
let day = d.getDate().toString();
if(d.getDay() == 31){
	day = '30';
}else if(d.getDate()<10){
	day = '0' + day;
}
if(d.getMonth()<10){
	month = '0' + month;
}

const vrep = new Vue({
    el: '#container',
    data: {
      items: []
    },
    mounted() {
      axios.get('https://api.github.com/search/repositories?q=created:>'+year+'-'+month+'-'+day+'&sort=stars&order=desc&page='+page)
              .then(res => {this.items = res.data.items});
    },
});
