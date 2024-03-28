import useI18n from "@/hooks/i18n.ts";
import MainLayout from "@/layout/main/MainLayout.tsx";
import { useI18nStore } from "@/store/i18n.ts";
import { Button, Swiper, Toast } from "antd-mobile";
import { useRef } from 'react';
import './index.less';

/**
 * 解决 swiper 在 parent 中上下滑动同时左右滑动的问题
 */

type Props = {
  className?: string
}

const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      // className={styles.content}
      style={{ background: color, height: "200px", color: "#fff" }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`);
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
));

function Index({ className, ...rest }: Props) {
  const t = useI18n();
  const i18nStore = useI18nStore()
  const touchStart = useRef({
    x: 0,
    y: 0,
  })

  const isMoveVertical = useRef(false)
  const isMoveHorizontal = useRef(false)
  const blockHorizontalAtFirst = useRef(true)

  let startTime = '' // 触摸开始时间
  let startDistanceX = '' // 触摸开始X轴位置
  let startDistanceY = '' // 触摸开始Y轴位置
  let endTime = '' // 触摸结束时间
  let endDistanceX = '' // 触摸结束X轴位置
  let endDistanceY = '' // 触摸结束Y轴位置
  let moveTime = '' // 触摸时间
  let moveDistanceX = '' // 触摸移动X轴距离
  let moveDistanceY = '' // 触摸移动Y轴距离


  return (
    <>
      <MainLayout>
        <div
          draggable={false}
          onTouchStart={e => {
            startTime = new Date().getTime().toString()
            startDistanceX = e.touches[0].screenX.toString()
            startDistanceY = e.touches[0].screenY.toString()
            touchStart.current = {
              x: e.targetTouches[0].screenX,
              y: e.targetTouches[0].screenY,
            }
          }}
          onTouchMoveCapture={e => {
            // 1. 一开始 水平滑动屏蔽掉 e.stopPropagation
            if (blockHorizontalAtFirst.current) {
              e.stopPropagation()
              e.nativeEvent.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
            }

            // 4. 垂直滑动后 设置为true，并且屏蔽水平判定
            if (isMoveVertical.current) {
              e.stopPropagation()
              e.nativeEvent.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
              return
            }

            // 3. 水平滑动后 设置true，并且屏蔽垂直判定
            if (isMoveHorizontal.current) {
              return
            }

            const { screenX, screenY } = e.targetTouches[0]

            // 2. 方向判定
            if (Math.abs(screenY - touchStart.current.y) > 10) {
              console.log('---isMoveVertical 上下---> ', Math.abs(screenY - touchStart.current.y))
              isMoveVertical.current = true
              blockHorizontalAtFirst.current = false
            } else if (Math.abs(screenX - touchStart.current.x) > 20) {
              console.log('---isMoveHorizontal 左右---> ', Math.abs(screenX - touchStart.current.x))
              isMoveHorizontal.current = true
              blockHorizontalAtFirst.current = false
            }
          }}
          onTouchEnd={(e) => {
            endTime = new Date().getTime().toString()
            endDistanceX = e.changedTouches[0].screenX.toString()
            endDistanceY = e.changedTouches[0].screenY.toString()
            moveTime = (Number(endTime) - Number(startTime)).toString()
            moveDistanceX = (Number(startDistanceX) - Number(endDistanceX)).toString()
            moveDistanceY = (Number(startDistanceY) - Number(endDistanceY)).toString()
            console.log(moveDistanceX, moveDistanceY)
            touchStart.current = { x: 0, y: 0 }
            // 判断滑动距离超过40 且 时间小于500毫秒
            if ((Math.abs((Number(moveDistanceX))) > 40) || Math.abs((Number(moveDistanceY))) > 40 && (Number(moveTime) < 500)) {
              // 判断X轴移动的距离是否大于Y轴移动的距离
              if (Math.abs((Number(moveDistanceX))) > Math.abs((Number(moveDistanceY)))) {
                // 左右
                console.log(moveDistanceX !== '0' ? '左' : '右')
              } else {
                // 上下
                console.log(moveDistanceX !== '0' ? '上' : '下')
              }
            }

            isMoveVertical.current = false
            isMoveHorizontal.current = false
            blockHorizontalAtFirst.current = true
          }}
          className="index-container"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          {...rest}>
          <p>{t('index.title')}</p>
          <Button onClick={() => {
            i18nStore.changeLanguage('zh_CN')
          }
          }>简体中文</Button>
          <Button onClick={() => {
            i18nStore.changeLanguage('en_US')
          }
          }>English</Button>
          <p style={{ fontSize: '12px', }}>
            Font size 12px</p>
          <Swiper
            loop
            trackOffset={10.6667}
            slideSize={78.6667}
            onIndexChange={(i) => {
              console.log(i, "onIndexChange1");
            }}
            stopPropagation={['mouseup', 'mousemove', 'mousedown']}
          >
            {items}
          </Swiper>

        </div>
      </MainLayout>
    </>
  );
}

export default Index
