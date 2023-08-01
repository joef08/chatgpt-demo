import { Show, createSignal, onMount } from 'solid-js'

interface InfoType { request_count: number, used_quota: number }

export default () => {
  const [info, setInfo] = createSignal<InfoType>({ request_count: 0, used_quota: 0 })
  const [show, setShow] = createSignal(0)

  onMount(async() => {
    getInfo()
  })

  const getInfo = async() => {
    const response = await fetch('/api/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJson = await response.json()
    if (responseJson.code === 200)
      setInfo(responseJson.data)
  }

  return (
    <div class="mt-2">
      <div onClick={() => { setShow(show() ? 0 : 1) }}>
        <p mt-1 text-sm op-60>
          <span>为了能持久运营,我们需要你的</span>
          <span class="border-1 px-2 py-1 mx-1 rounded-md transition-colors bg-slate/20 cursor-pointer hover:bg-slate/50">捐赠</span>
          <span>🙏🏻</span>
        </p>
        <p mt-1 text-xs op-60>感谢 匿名,匿名,M,姜*凡,E*s,二*三,SK**明,匿名,Li**He 的捐赠</p>
        <Show when={info().request_count > 0}>
          <p mt-3 text-xs op-60>本站共处理{info().request_count}次问答,消耗{(info().used_quota / 1000).toFixed(1)}K≈${(info().used_quota / 500000).toFixed(1)} token</p>
        </Show>
      </div>
      <Show when={show() === 1}>
        <div>
          <div mt-4>
            <span op-60>使用微信扫一扫</span>
            <img class="w-3/5 mt-2 max-w-[250px]" src="https://gzgptnb.oss-cn-guangzhou.aliyuncs.com/chatphp/202307/1690812533321.jpg" />
          </div>

          <button onClick={() => { setShow(0) }} class="w-1/3 h-12 mt-2 px-4 py-2 bg-slate bg-op-15 hover:bg-op-20 rounded-sm">
            关闭
          </button>
        </div>
      </Show>

    </div>
  )
}
