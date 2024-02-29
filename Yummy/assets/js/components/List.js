export default {
  template: /* html*/`
      <p @click="getLocation">クリック</p>
    <section id="list">
      <aside class="option">
        <h3>お店を探す</h3>
        <div>
          <h4>距離</h4>
          <select v-model="range">
            <option value="1">300m</option>
            <option value="2">500m</option>
            <option value="3">1000m</option>
            <option value="4">2000m</option>
            <option value="5">3000m</option>
          </select>
        </div>
        <h4>お好み条件</h4>
        <div>
          <input type="checkbox" value="1" v-model="free_drink" id="free_drink"><label for="free_drink">飲み放題</label>
        </div>
        <div>
          <input type="checkbox" value="1" v-model="free_food" id="free_foodc"><label for="free_food">食べ放題</label>
        </div>
        <div>
          <input type="checkbox" value="1" v-model="private_room" id="private_room"><label for="private_room">個室</label>
        </div>
        <div>
          <input type="checkbox" value="1" v-model="lunch" id="lunch"><label for="lunch">ランチ</label>
        </div>
        <div>
          <input type="checkbox" value="1" v-model="midnight" id="midnight"><label for="midnight">深夜営業</label>
        </div>
        <div>
          <input type="checkbox" value="1" v-model="charter" id="charter"><label for="charter">貸し切り可</label>
        </div>
        <div>
          <input type="checkbox" value="1" v-model="parking" id="parking"><label for="parking">駐車場</label>
        </div>
        <div>
          <input type="checkbox" value="1" v-model="wifi" id="wifi"><label for="wifi">Wi-Fi</label>
        </div>
        <button type="button" @click="getGourmet">検索</button>
      </aside>
      <section id="shops">
        <ul>
          <li class="shop" v-for="item in view_shop" @click="onClickShop(item.id)">
          <div class="img-wrap">
            <figure>
              <img :src="item.photo.pc.l" alt="">
            </figure>
          </div>
          <div class="box">
            <h3 class="ttl">{{ item.genre.name }} : {{item.name}}</h3>
            <p>{{ item.catch }}</p>
            <dl>
              <div class="flex">
                <dt><img src="./assets/img/clock.png"></dt><dd>{{ item.open }}</dd>
              </div>
              <div class="flex">
                <dt><img src="./assets/img/home.png"></dt><dd>{{ item.address }}</dd>
              </div>
              <div class="flex">
                <dt><img src="./assets/img/yen.png"></dt><dd>{{ item.budget.name }}</dd>
              </div>
              <div class="flex">
                <dt><img src="./assets/img/trein.png"></dt><dd>{{ item.access }}</dd>
              </div>
            </dl>
          </div>
          </li>
        </ul>
        <div class="paging">
          <div @click="setCurrentPage(1)">&lt;</div>
          <div :class="currentPage == startPage +  idx - 1 ? 'current' : ''" v-for="idx in pagingCout" @click="setCurrentPage(startPage +  idx - 1)">{{startPage +  idx - 1}}</div>
          <div @click="setCurrentPage(maxPage)">&gt;</div>
        </div>
      </section>
    </section>
  `,
  emits: [
    'click-shop'
  ],
  data() {
    return {
        maxPage: 1,
        currentPage: 1,
        pageCout: 10,
        startPage: 1,
        endPage: 3,
        pagingCout: 3,


        locationData: null,
        errorMessage: '',
        range: 5,
        free_drink: 0,
        free_food: 0,
        private_room: 0,
        lunch: 0,
        midnight: 0,
        charter: 0,
        parking: 0,
        wifi: 0,
        list:  []
    }
  },
  methods: {
    getLocation() {
      const options = {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0
      };
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              position => {
                  this.locationData = position.coords;
                  this.errorMessage = '';
                  console.log(this.locationData);
                 this.getGourmet();
              },
              error => {
                  this.errorMessage = `ERROR(${error.code}): ${error.message}`;
              },
              options
          );
      } else {
          this.errorMessage = 'Geolocation is not supported by this browser.';
      }
    },
    getGourmet() {
      const obj = {
        type: 'GET',
        headers: {
          'Access-Control-Allow-Origin' : '*',
        },

      };
      fetch(`./api/proxy.php?lat=${this.locationData.latitude}&lng=${this.locationData.longitude}&range=${this.range}`, obj)
      .then(res => res.text())
      .then(data => {
        // console.log(data);
        const temp = JSON.parse(data);
        this.list = temp.results.shop;
        this.setPagingData();
      });
    },
    setPagingData() {
      this.maxPage = Math.floor((this.list.length - 1) / this.pageCout) + 1;
      if(this.maxPage < 3) {
        this.pagingCout = this.maxPage;
      }
      this.currentPage = this.startPage = 1;
    },
    setCurrentPage(page) {
      console.log(page);
      this.currentPage = page;
      if(this.currentPage <= 1) {
        this.startPage = 1;
        this.endPage = 3;
      }
      else if(this.currentPage >= this.maxPage) {
        this.startPage = this.maxPage - 2;
        if(this.startPage < 1) {
          this.startPage = 1;
        }
        this.endPage = this.maxPage;
      }
      else {
        this.startPage = this.currentPage - 1;
        this.endPage = this.currentPage + 1;
      }
      window.scroll({top: 0,  behavior: "smooth"});

    },
    onClickShop(id) {
      this.$emit('click-shop', id);
    }
  },
  mounted() {
    this.getLocation();
  },
  computed: {
    'view_shop'() {
      const res = this.list.slice((this.currentPage - 1) * this.pageCout, this.currentPage * this.pageCout );
      return res;
    }
  }
}
