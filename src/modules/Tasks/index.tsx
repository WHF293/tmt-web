import { Outlet, useLocation } from 'react-router-dom'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function Tasks() {
  // const location = useLocation()

  return (
    <>
      {/* component={null} 渲染成<></>, 否则渲染成 div */}
      {/* <TransitionGroup component={null}>
        <CSSTransition key={location.key} timeout={800} classNames="animate" nodeRef={null}> */}
      <Outlet />
      {/* </CSSTransition>
      </TransitionGroup> */}
    </>
  )
}
