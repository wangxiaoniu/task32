
let $buttons = $('#btn > button')
let $img = $('#slideshow > img')
let current = 0
makeFakeSlides()
$('#slideshow').css({ transform: 'translateX(-920px)' })
bindEvents();

//点击前后箭头切换图片
$('#next').on('click', () => {
    goSlide(current + 1)
})
$('#pre').on('click', () => {
    goSlide(current - 1)
   
})
//自动播放幻灯片
let timer =setInterval(()=>{  
    goSlide(current + 1)
   
},3000)

//鼠标移入停止幻灯片，离开重启幻灯片
$('#window').on('mouseenter',()=>{
    window.clearInterval(timer)
}).on('mouseleave',()=>{
    timer =setInterval(()=>{
        goSlide(current + 1)      
    },3000)
})

//浏览器标签页被隐藏或显示的时候会触发visibilitychange事件.
document.addEventListener("visibilitychange", () => { 
    if(document.hidden) {
        // 页面被挂起
        window.clearInterval(timer)
    }
    else {
        // 页面呼出
        timer =setInterval(()=>{
            goSlide(current + 1)    
        },3000)
    }
});




//以下工具函数


//点击按钮切换到对应图片
function bindEvents() {
    $('#btn').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goSlide(index)
    })

}

//主要函数 切换图片功能函数
function goSlide(index) {
    if (index > $buttons.length-1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if(current === $buttons.length -1 && index === 0){
        //最后一张到第一张

        $('#slideshow').css({transform:`translateX(${-($buttons.length + 1) * 920}px)`})
        .one('transitionend', function(){
            $('#slideshow').hide()
            $('#slideshow').offset() 
          $('#slideshow').css({transform:`translateX(${-(index+1)*920}px)`}).show()
        })
        
    } else if (current === 0 && index === $buttons.length - 1) {
        //第一张到最后一张
        $('#slideshow').css({ transform: 'translateX(0px)' })
            .one('transitionend', () => {
                $('#slideshow').hide()
                $('#slideshow').offset()
                $('#slideshow').css({ transform: `translateX(${-($buttons.length) * 920}px)` }).show()
            })
    }
    else {
        $('#slideshow').css({ transform: `translateX(${-(index + 1) * 920}px)` })

    }
    //当前按钮处于active激活状态
    $buttons.eq(index).addClass('active').siblings().removeClass('active')
    current = index    
}

//copy最后一张及第一张，分别添加到图片序列的首尾
function makeFakeSlides() {
    let $firstCopy = $img.eq(0).clone(true)
    let $lastCopy = $img.eq($buttons.length-1).clone(true)//clone()克隆 为true克隆全家,否则只克隆一个
    $('#slideshow').append($firstCopy)
    $('#slideshow').prepend($lastCopy) //prepend()在最前面加入
}


