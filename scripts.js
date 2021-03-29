// ELIZABETH RICHARDSON



console.log('your desk is a mess')



// switch between two images with the 'multi' class on their parent div
function multi() {
  if (document.querySelector('.multi')) {
    let els = document.querySelectorAll('.multi')
    for (let i = 0; i < els.length; i++) {
      let el = els[i]
      el.addEventListener('click', function() {
        el.classList.toggle('clicked')
      })
    }
  }
}

multi()




// audio stuff
function audio(selector, audioSelector, canPause) {
  if (document.querySelector(selector) && document.querySelector(audioSelector)) {
    let el = document.querySelector(selector)
    let sound = document.querySelector(audioSelector)
    el.addEventListener('click', function() {
      if (canPause) {
        if (!sound.paused) {
          sound.pause()
        } else {
          sound.play()
        }
      } else {
        sound.play()
      }
    })
  }
}

audio('.cat', '.cat-sound', false)
audio('.bowl', '.bowl-sound', false)
audio('.horn', '.horn-sound', false)
audio('.polygondwanaland', '.polygondwanaland-sound', true)


// draggable stuff

// Make items draggable by specifying a selector, for example
// draggable('.drag')





// Draggable
function draggable(selector) {
  if (document.querySelector(selector)) {
    let dragItems = document.querySelectorAll(selector)
    for (let i = 0; i < dragItems.length; i++) drag(dragItems[i]);
      function drag(el) {
        let dragItem = el
        let body = document.body
        let active = false
        let currentX
        let currentY
        let initialX
        let initialY
        let highestZ = 1
        let newZ = dragItem.style.zIndex || 1
        let xOffset = 0
        let yOffset = 0

        body.addEventListener('touchstart', dragStart, false)
        body.addEventListener('touchend', dragEnd, false)
        body.addEventListener('touchmove', drag, false)
        body.addEventListener('mousedown', dragStart, false)
        body.addEventListener('mouseup', dragEnd, false)
        body.addEventListener('mousemove', drag, false)

        function dragStart(e) {
          if (e.type === 'touchstart') {
           initialX = e.touches[0].clientX - xOffset
           initialY = e.touches[0].clientY - yOffset
         } else {
           initialX = e.clientX - xOffset
           initialY = e.clientY - yOffset
         }
         if (e.target === dragItem) {
           active = true
           dragItem.style.cursor = 'grabbing'
           newZ = makeHighestZ()
           let initZ = parseInt(dragItem.style.zIndex)
           if (newZ > initZ) {
             dragItem.style.zIndex = newZ
           } 
         }			
       }

       function makeHighestZ() {	
        let initZ = parseInt(dragItem.style.zIndex)
        for (let i = 0; i < dragItems.length; i++) {
         if (!dragItems[i].style.zIndex) {
           dragItems[i].style.zIndex = 1
         }
         if (parseInt(dragItems[i].style.zIndex) > highestZ) {
           highestZ = parseInt(dragItems[i].style.zIndex)
         } else {
           highestZ = highestZ
         }
       }
       if (initZ >= highestZ) {
         return initZ
       } else {
         return ++highestZ
       }
     }

     function dragEnd(e) {
      initialX = currentX
      initialY = currentY
      active = false
      dragItem.style.cursor = 'grab'
    }

    function drag(e) {
      if (active) {
       if (e.type === 'touchmove') {
         currentX = e.touches[0].clientX - initialX
         currentY = e.touches[0].clientY - initialY
       } else {
         currentX = e.clientX - initialX
         currentY = e.clientY - initialY
       }
       xOffset = currentX
       yOffset = currentY
       setTranslate(currentX, currentY, dragItem)
     }
   }

   function setTranslate(xPos, yPos, el) {
    el.style.transform = 'translate(' + xPos + 'px, ' + yPos + 'px)'
  }
}
function resetAllItems() {		
  for (let i = 0; i < dragItems.length; i++) {
    dragItems[i].style.transition = 'transform 1s'
    dragItems[i].style.transform = 'translate(0px,0px)'
    setTimeout(function() {
     dragItems[i].style.transition = ''
   }, 1000)			
  }
  draggable(selector)
}
}
if (document.querySelector('.reset')) {
  document.querySelector('.reset').addEventListener('click', function() {
    if (document.querySelector(selector)) {
      resetAllItems()
    }
    if (document.querySelector('.clicked')) {
      let clicked = document.querySelectorAll('.clicked')
      for (let i = 0; i < clicked.length; i++) {
        clicked[i].classList.remove('clicked')
      }
    }
  })
}
}


draggable('.draggable')


