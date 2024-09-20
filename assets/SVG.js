import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 -9 58 58"
    {...props}
  >
    <Rect
      width={57}
      height={39}
      x={0.5}
      y={0.5}
      fill="#fff"
      stroke="#F3F3F3"
      rx={3.5}
    />
    <Path
      fill="#4D4D4D"
      fillRule="evenodd"
      d="M19.665 16.174c.406 0 .757.073 1.051.215.296.143.541.337.737.58.193.244.337.53.43.857.092.328.139.68.139 1.059 0 .58-.107 1.128-.323 1.644a4.136 4.136 0 0 1-2.198 2.255 4.034 4.034 0 0 1-1.646.335c-.076 0-.21-.002-.4-.006a5.817 5.817 0 0 1-.652-.056 7.65 7.65 0 0 1-.78-.152 3.927 3.927 0 0 1-.779-.278l2.192-9.161 1.963-.303-.785 3.25c.168-.075.337-.133.506-.175.17-.041.351-.064.545-.064ZM18.02 21.57c.296 0 .574-.072.836-.215.262-.142.489-.334.678-.573.19-.24.34-.51.45-.813.11-.302.165-.618.165-.946 0-.403-.068-.718-.203-.945-.135-.226-.385-.34-.748-.34-.119 0-.272.022-.462.063-.19.043-.36.132-.514.265l-.835 3.453.133.025a1.345 1.345 0 0 0 .272.026h.228ZM24.058 22.943h-1.875l1.583-6.629h1.888l-1.596 6.629Zm.912-7.436c-.262 0-.499-.078-.71-.233-.212-.154-.317-.392-.317-.712 0-.176.036-.342.107-.497a1.323 1.323 0 0 1 .697-.675c.157-.067.324-.1.502-.1.261 0 .497.077.708.232.21.156.317.394.317.712 0 .177-.036.343-.108.499a1.32 1.32 0 0 1-1.196.774ZM27.297 14.663l1.964-.302-.482 1.953h2.103l-.38 1.537h-2.09l-.558 2.32c-.05.192-.08.373-.088.54a.987.987 0 0 0 .063.436.55.55 0 0 0 .272.282c.131.068.318.102.564.102.202 0 .399-.02.59-.057.189-.037.38-.09.575-.158l.14 1.438a6.755 6.755 0 0 1-.824.239 4.78 4.78 0 0 1-1.051.1c-.583 0-1.034-.086-1.356-.257a1.504 1.504 0 0 1-.685-.707 2.231 2.231 0 0 1-.177-1.026 6.64 6.64 0 0 1 .177-1.223l1.243-5.217ZM30.799 20.297c0-.571.093-1.11.279-1.614.185-.504.452-.945.799-1.324a3.735 3.735 0 0 1 1.26-.894 4.04 4.04 0 0 1 1.653-.328 4.132 4.132 0 0 1 1.837.39l-.647 1.463a6.195 6.195 0 0 0-.525-.182 2.304 2.304 0 0 0-.665-.083c-.626 0-1.12.215-1.489.642-.366.429-.551 1.005-.551 1.728 0 .428.093.774.279 1.04.186.264.528.396 1.026.396a3.496 3.496 0 0 0 1.318-.264l.14 1.5a6.717 6.717 0 0 1-.786.246c-.287.07-.63.106-1.027.106-.523 0-.967-.076-1.33-.226a2.533 2.533 0 0 1-.898-.612 2.301 2.301 0 0 1-.514-.902 3.658 3.658 0 0 1-.159-1.082ZM39.127 23.12c-.447 0-.836-.068-1.165-.202a2.155 2.155 0 0 1-.817-.567 2.45 2.45 0 0 1-.488-.863 3.464 3.464 0 0 1-.163-1.102c0-.505.081-1.01.246-1.513.164-.504.407-.958.73-1.36.319-.404.712-.734 1.177-.992.463-.255.996-.383 1.595-.383.44 0 .826.067 1.16.202.333.134.607.324.824.567.214.244.377.531.486.863.11.331.165.7.165 1.102 0 .504-.08 1.009-.24 1.514-.16.502-.397.957-.71 1.36a3.716 3.716 0 0 1-1.171.99c-.469.255-1.012.383-1.629.383Zm.937-5.394c-.278 0-.523.08-.734.239a2.06 2.06 0 0 0-.531.605 2.977 2.977 0 0 0-.324.8c-.072.29-.107.565-.107.825 0 .42.068.748.202.984.136.235.38.353.735.353.279 0 .523-.08.735-.24.21-.16.387-.361.532-.605.143-.243.251-.51.323-.8.072-.29.107-.565.107-.825 0-.42-.067-.748-.203-.984-.135-.235-.38-.352-.735-.352ZM44.92 22.943h-1.877l1.584-6.629h1.889l-1.596 6.629Zm.91-7.436c-.26 0-.498-.078-.708-.233-.212-.154-.318-.392-.318-.712 0-.176.036-.342.108-.497.072-.156.167-.29.285-.404.118-.113.257-.203.412-.271.156-.067.323-.1.5-.1.262 0 .499.077.71.232.211.156.317.394.317.712 0 .177-.038.343-.108.499a1.31 1.31 0 0 1-.696.674c-.157.068-.323.1-.501.1ZM47.866 16.616c.142-.041.301-.09.474-.145a7.175 7.175 0 0 1 1.305-.264 8.19 8.19 0 0 1 .906-.045c.988 0 1.67.287 2.047.858.375.572.44 1.353.196 2.344l-.862 3.579h-1.887l.836-3.504c.05-.219.09-.43.12-.637a1.5 1.5 0 0 0-.006-.541.646.646 0 0 0-.234-.378c-.124-.097-.31-.145-.564-.145-.245 0-.493.026-.747.076l-1.23 5.129h-1.887l1.533-6.327ZM25.212 26.894l-.368.665h-.398a30.214 30.214 0 0 1 1.61-2.589h.357c.038.187.072.376.104.566a29.737 29.737 0 0 1 .178 1.265c.028.234.056.486.086.758h-.367a14.698 14.698 0 0 1-.034-.338c-.01-.113-.022-.222-.034-.327h-1.134Zm1.1-.292a18.759 18.759 0 0 0-.161-1.217 17.927 17.927 0 0 0-.77 1.218h.931ZM28.112 27.614a1.2 1.2 0 0 1-.43-.07.824.824 0 0 1-.31-.202.836.836 0 0 1-.186-.316 1.307 1.307 0 0 1-.061-.416c0-.224.035-.439.107-.643.07-.204.172-.384.304-.541.13-.157.29-.282.474-.376.186-.093.392-.14.62-.14.195 0 .35.02.467.06.116.04.2.077.25.112l-.15.299a1.08 1.08 0 0 0-.586-.157.898.898 0 0 0-.465.122c-.138.08-.255.185-.35.313a1.441 1.441 0 0 0-.217.434c-.05.16-.075.319-.075.476 0 .485.211.728.634.728a1.42 1.42 0 0 0 .432-.062 1 1 0 0 0 .146-.054l.113-.052.045.313a.975.975 0 0 1-.118.056 1.52 1.52 0 0 1-.389.1c-.08.01-.165.016-.255.016ZM30.22 27.614a1.2 1.2 0 0 1-.429-.07.825.825 0 0 1-.31-.202.839.839 0 0 1-.186-.316 1.307 1.307 0 0 1-.061-.416c0-.224.035-.439.107-.643.07-.204.172-.384.304-.541a1.49 1.49 0 0 1 .474-.376c.186-.093.392-.14.62-.14.195 0 .35.02.467.06.117.04.2.077.25.112l-.15.299a1.084 1.084 0 0 0-.586-.157.899.899 0 0 0-.465.122c-.138.08-.254.185-.35.313a1.593 1.593 0 0 0-.293.91c0 .485.212.728.635.728a1.42 1.42 0 0 0 .432-.062 1 1 0 0 0 .146-.054l.113-.052.045.313a.985.985 0 0 1-.118.056 1.513 1.513 0 0 1-.389.1c-.08.01-.165.016-.255.016ZM31.229 27.558l.623-2.588h1.535l-.071.303H32.14l-.188.78h1.044l-.072.295h-1.04l-.22.908h1.26l-.07.302h-1.626ZM34.474 24.944c.303 0 .531.057.685.172.154.114.23.281.23.5 0 .17-.031.316-.095.439a.82.82 0 0 1-.272.305 1.26 1.26 0 0 1-.424.177c-.165.038-.35.058-.552.058h-.259l-.233.963h-.364l.616-2.554c.105-.025.216-.041.334-.049a5.06 5.06 0 0 1 .334-.011Zm-.045.306c-.178 0-.285.005-.323.015l-.248 1.027h.237c.105 0 .212-.009.323-.028a.965.965 0 0 0 .296-.099.6.6 0 0 0 .216-.196.565.565 0 0 0 .084-.323c0-.142-.052-.243-.157-.304a.852.852 0 0 0-.428-.092ZM37.61 24.97l-.07.303h-.785l-.552 2.285h-.364l.552-2.285h-.785l.071-.303h1.934ZM37.273 27.558l.623-2.588h1.535l-.071.303h-1.175l-.188.78h1.044l-.072.295h-1.04l-.22.908h1.26l-.07.302h-1.626ZM40.512 24.944c.386 0 .673.09.864.27.19.181.285.425.285.73 0 .215-.034.42-.101.619a1.436 1.436 0 0 1-.862.887c-.221.09-.486.134-.794.134a4.22 4.22 0 0 1-.341-.015 1.826 1.826 0 0 1-.323-.052l.604-2.513a1.99 1.99 0 0 1 .334-.049c.118-.007.23-.011.334-.011Zm-.03.306c-.187 0-.3.005-.338.015l-.48 1.994c.02.005.054.01.101.013.048.004.125.006.233.006.198 0 .376-.033.535-.099.159-.066.293-.158.404-.276.11-.119.195-.259.255-.422.06-.163.09-.342.09-.536 0-.219-.064-.39-.192-.512-.127-.122-.33-.183-.608-.183ZM44.465 27.558h-.364l.289-1.202h-1.205l-.289 1.202h-.364l.623-2.588h.364l-.263 1.083h1.206l.262-1.083h.365l-.624 2.588ZM45.04 27.558l.623-2.588h1.535l-.072.303h-1.175l-.187.78h1.043l-.072.295h-1.04l-.22.908h1.26l-.071.302h-1.625ZM48.285 24.944c.278 0 .498.056.66.168a.56.56 0 0 1 .244.493.81.81 0 0 1-.193.55c-.129.149-.31.255-.542.32a5.879 5.879 0 0 1 .353.775c.04.106.074.208.105.308h-.372l-.109-.288a5.459 5.459 0 0 0-.338-.74 2.647 2.647 0 0 1-.195.008h-.289l-.244 1.02h-.364l.616-2.555c.105-.025.216-.04.334-.048.117-.007.229-.011.334-.011Zm-.045.306c-.178 0-.286.005-.324.015l-.236.979h.222c.102 0 .207-.008.315-.023a.964.964 0 0 0 .294-.087.576.576 0 0 0 .218-.183.524.524 0 0 0 .085-.312c0-.14-.053-.24-.16-.299a.84.84 0 0 0-.414-.09ZM49.217 27.558l.623-2.588h1.535l-.071.303h-1.175l-.188.78h1.044l-.072.295h-1.04l-.221.908h1.261l-.072.302h-1.624Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F7931A"
      fillRule="evenodd"
      d="M10.003 23.119c2.764 0 5.004-2.229 5.004-4.978 0-2.749-2.24-4.977-5.004-4.977C7.24 13.164 5 15.392 5 18.14c0 2.75 2.24 4.978 5.003 4.978Zm2.206-5.687c.1-.663-.407-1.02-1.1-1.257l.224-.898-.549-.136-.219.874c-.144-.036-.292-.07-.44-.103l.22-.88-.548-.136-.225.898c-.12-.027-.237-.054-.35-.083v-.002l-.758-.188-.146.583s.408.093.4.099c.222.055.262.201.255.318l-.256 1.022a.36.36 0 0 1 .057.018l-.058-.014-.36 1.433c-.026.067-.095.167-.25.13.005.007-.4-.1-.4-.1l-.273.626.715.177c.133.033.263.068.39.1l-.226.908.548.136.225-.898c.15.04.296.078.438.113l-.224.894.549.136.227-.906c.937.177 1.64.106 1.937-.737.24-.679-.012-1.07-.504-1.325.359-.083.629-.317.701-.802Zm-1.255 1.75c-.17.679-1.317.312-1.69.22l.302-1.203c.372.092 1.566.275 1.388.983Zm.17-1.76c-.154.617-1.11.303-1.42.227l.273-1.091c.31.077 1.309.22 1.147.864Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent