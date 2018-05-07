const createLoading = ()=> {
    let mydiv = document.createElement('div')
      let app = document.querySelector('#app')
      mydiv.innerHTML = ''
      mydiv.className = 'loading'
      app.appendChild(mydiv)
      for (let index = 0; index < 5; index++) {
        let span = document.createElement('span')
        mydiv.appendChild(span)
      }
  }
  const removeMyLoading = ()=> {
    let mydiv = document.querySelector('.loading')
    let app = document.querySelector('#app') 
    app.removeChild(mydiv)
    
  }
  
  export const MyIndicator = {
    open(){
      createLoading()
    },
    close(){
      removeMyLoading()
    }
  }