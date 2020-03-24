<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
	
		<div class="row w-100">
			<div class="col-12 col-md-4 offset-md-4 d-flex flex-column align-items-center bottom-line">
				<img class="player-image" src=""/>
				<div class="player-name mt-2"> {{ profile.name || '' }} </div>
			</div>
		</div>
		
		<div class="row mt-4 w-100">
			<div class="col-12 col-md-4 offset-md-4 px-md-5">
				<div class="wins">
					<div class="row">
						<div class="col-6 text-left">Victory</div>
						<div class="col-6 text-right"> {{ stats.victory || 0 }} </div>
					</div>
				</div>
				<div class="defeats">
					<div class="row">
						<div class="col-6 text-left">Defeats</div>
						<div class="col-6 text-right"> {{ stats.defeats || 0 }} </div>
					</div>
				</div>
				<div class="ties">
					<div class="row">
						<div class="col-6 text-left">Ties</div>
						<div class="col-6 text-right"> {{ stats.ties || 0 }} </div>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-4 w-100">
			<div class="col-12 col-md-4 offset-md-4 text-center">
				{{
					state || ''
				}}
			</div>
		</div>

  </div>
</template>

<script>
  
  export default {
    name: 'Room',
    data(){
      return {  
				profile: {},
				stats: {},
				state: '',
      }
    },
    methods : {
			getProfile (){
			},
			getStats () {
			},
			getState () {
			},
		},
		sockets: {
      start(data){
        if(data){
          this.$router.push({
						name: 'game',
						params: {
							name: this.profile.name,	
						}
          });
        }
      },
    },
		created(){
			const local = localStorage.getItem('player');
			const {
				user,
				stats
			} = JSON.parse(local || '{}');

			this.profile = user;
			this.stats = stats;
			this.state = 'Waiting a player';

			setTimeout(() => {
				this.$socket.emit('subscribe', { name: this.profile.name });
			}, 1000);
			
		}
  }

</script>

<style scoped lang="scss">

  .container-fluid {
    color: #fff;
    background-color: rgba(31, 31, 31, .9);
    width: 100vw;
    height: 100vh;
  }

	.player-image {
		width: 180px;
		height: 180px;
		border-radius: 50%;
		background-color: #888;
	}

	.bottom-line {
		padding-bottom: 10px;
		box-shadow: #fff 0px 5px 10px -12px;
	}

</style>
