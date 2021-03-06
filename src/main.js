const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')


const hash = localStorage.getItem('hash')
const hashObject = JSON.parse(hash)
const hashMap = hashObject || [
  {
    logo: 'G',
    url: 'https://github.com/',
  },
  {
    logo: 'M',
    url: 'https://developer.mozilla.org/zh-CN/',
  },
  {
    logo: 'W',
    url: 'https://wikipedia.org/wiki/',
  },
  {
    logo: 'W',
    url: 'https://youtube.com',
  },
  {
    logo: 'W',
    url: 'https://juejin.im/',
  },
  {
    logo: 'A',
    url: 'https://www.acfun.cn',
  },
  {
    logo: 'O',
    url: 'https://outlook.live.com/',
  },
  {
    logo: 'M',
    url: 'https://music.163.com/',
  },
  {
    logo: 'G',
    url: 'https://www.google.com/',
  },
]

const simplifyUrl = (url) => {
  return url
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
      <div class="logo">${simplifyUrl(node.url)[0].toUpperCase()}</div>
      <div class="close"><svg class="icon-close">
      <use xlink:href="#icon-close"></use>
    </svg></div>
      <div class="link">${simplifyUrl(node.url)}</div>
    </div>
</li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

$('.addButton').on('click', () => {
  let url = window.prompt('what?')
  console.log(url)
  if (url.indexOf('http') !== 0) {
    url = 'https://www.' + url
  }
  console.log(url)
  hashMap.push({
    logo: url[0],
    url: url,
  })

  render()
})

// window.onbeforeunload = () => {
//   const string = JSON.stringify(hashMap)
//   localStorage.setItem('hash', string)
// }
