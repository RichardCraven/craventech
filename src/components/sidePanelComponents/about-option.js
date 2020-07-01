import React, { Fragment } from 'react';
import "../../styles/side-panel.scss"
import { Keyframes, animated } from 'react-spring/renderprops'
import delay from 'delay'

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
    // Slots can take arrays/chains,
    peek: [{ x: 0, from: { x: -100 }, delay: 500 }, { x: -100, delay: 800 }],
    // single items,
    open: { delay: 100, x: '25%', height: '0vh', width: '70vw', overflow: 'inherit'},
    // or async functions with side-effects
    close: async call => {
      await delay(400)
      await call({ delay: 0, x: '-100%', height: '0vh', width: '70vw', overflow: 'hidden'})
    },
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
    peek: [
      { x: 0, opacity: 1, from: { x: -100, opacity: 0 }, delay: 600 },
      { x: -100, opacity: 0, delay: 0 },
    ],
    open: { x: 0, opacity: 1, delay: 100 },
    close: { x: -100, opacity: 0, delay: 0 },
})

const items = [
    <div>
        I'm a UI/UX engineer by trade, creative developer by passion, and between the hours of 9pm and 2am, a recording artist. I enjoy building out full stack projects in various JavaScript frameworks. If the project involves user to user interaction, I do my best to apply social engineering principles to anticipate future issues and maximize a positive user experience. 
    </div>,
    <div>
      Based out of the SF bay area, I entered the industry through the door of game development, working on a multiplayer browser game called Mobius Dimension (now extinct). We used socket.io to handle user interaction and had a small but enthusiastic user base to cater to. Then I moved to Dallas to work at Citi, developing investment management applications. In Dallas I started building Doors and Keys, a free online dungeon crawler.
    </div>,
    <div>
      In 2019 I moved back to the SF bay area to work at Visa, building out an app marketplace for financial instituions. This project leveraged different frameworks and backend architecture to provide the consumers with data modeling for their respective clients.
      I also joined Blooskai, a computer vision startup, initially as a consultant on web development. I've since built out the browser and mobile apps as POCs, using Angular 8 and Android on Cordova.
    </div>,
    <Fragment>
      {/* <Checkbox size="small">Remember me</Checkbox> */}
      <div>
          I make a point to keep a comfortable work/life balance, maintaining personal and professional networks, and producing music and art when I can. I have a large backlog of projects and application ideas, and a long term goal is to foster a community of developers and artists to keep the juices flowing.
      </div>
      {/* <a className="login-form-forgot" href="#" children="Forgot password" /> */}
      {/* <Button
        size="small"
        type="primary"
        htmlType="submit"
        className="login-form-button"
        children="Log in"
      /> */}
      {/* <div>
          
      </div> */}
    </Fragment>
  ]

  export default class AboutOption extends React.Component  {
      state = { open: false}
    //   props = this.props;
      toggle = () => {

          this.setState(state => ({ open: !state.open }))
          this.props.handleClick(0)
      }
      render() {
          const state =
          this.state.open === undefined
          ? 'peek'
          : this.state.open
          ? 'open'
          : 'close'
          const icon = this.state.open ? 'fold' : 'unfold'
        return (
            
        <div className={`
        side-panel-option
        ${this.props.hoveredOptionIdx === 0 ? 'hoveredOption' : ''}
        ${this.props.hidePortfolioOption ? 'hideOptions' : ''}
        `}
        onClick={() => this.toggle()} 
        onMouseEnter={() => this.props.hoverOn(0)} 
        onMouseLeave={() => this.props.hoverOff(0)} 
        >
          <span className={"text"}>Bio</span>
          <span  className={`color ${this.props.option.class}`}></span>
          <Sidebar className="sidebarf" native="true" state={state}>
              {/* HELLOOOOO */}
              {({ x, height, width, overflow }) => (
              <animated.div
                className="sidebar"
                style={{
                  transform: x.interpolate(x => `translate3d(${x},0,0)`),
                //   background: 'linear-gradient(#314190, #616dbb #9198e5)',
                  height: height,
                  width: width,
                  overflow: overflow
                }}>
                <Content
                  native
                  items={items}
                  keys={items.map((_, i) => i)}
                  reverse={!this.state.open}
                  state={state}>
                  {(item, i) => ({ x, ...props }) => (
                    <animated.div
                      style={{
                        transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                        ...props,
                        minHeight: '18vh',
                        // height: '33.333%',
                        background: i === 0 ? 
                          'linear-gradient(#212b5f, #39447e)' : 
                        (i === 1 ? 
                          'linear-gradient(#39447e, #4d5997)' : 
                        (i === 2 ? 
                          'linear-gradient(#4d5997, #6472b5)' : 

                          'linear-gradient(#6472b5, #7a89d1)'))
                        // border: '1px solid white'
                      }}>
                          {item}
                    </animated.div>
                  )}
                </Content>
              </animated.div>
            )}
          </Sidebar>
        </div>
      )
    }
  }