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
      items: [],
			loading: false
    },
    mounted() {
			this.loading = true;
      axios.get('https://api.github.com/search/repositories?q=created:>'+year+'-'+month+'-'+day+'&sort=stars&order=desc&page='+page)
              .then(res => {
								this.loading = false;
								this.items = res.data.items;
							}, (error)  =>  {
				        this.loading = false;
				      });
    },
});
//alert('https://api.github.com/search/repositories?q=created:>'+year+'-'+month+'-'+day+'&sort=stars&order=desc&page='+page);
var l = true;
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        page++;
				var container = document.getElementById('container');

				if(l){
					container.innerHTML+='<div v-if="loading" class="loading"><img src="img/loading.gif" alt=""></div><div class="repos" v-for="item in items"><span class="user_avatar"><img :src=\'item.owner.avatar_url + ".png"\'></span><span class="name"><h1>{{item.name}}</h1></span><span class="desc"><p>{{item.description}}</p></span><span class="stars">Stars: {{item.stargazers_count}}</span><span class="issues">Issues: {{item.open_issues_count}}</span><span class="user"><i>Submitted {{item.pushed_at}} ago by {{item.owner.login}}</i></span></div>';
					l = false;
					new Vue({
					    el: '#container',
					    data: {
					      items: [],
								loading: false
					    },
					    mounted() {
								this.loading = true;
					      axios.get('https://api.github.com/search/repositories?q=created:>'+year+'-'+month+'-'+day+'&sort=stars&order=desc&page='+page)
					              .then(res => {
													this.loading = false;
													l = true;
													this.items = res.data.items;
												}, (error)  =>  {
									        this.loading = false;
									      });
					    },
					});
				}

    }
};
