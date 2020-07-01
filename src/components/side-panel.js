import "../styles/side-panel.scss"

import React, { useState, useRef, useEffect } from 'react';
import "../styles/main.scss"

import { Global, Container, Item } from '../styles/styles'
import { useTransition, useSpring, useChain, useTrail, animated, config } from 'react-spring'

// import Mailto from './mailto.js';
import PortfolioOption from './sidePanelComponents/portfolio-option';
import AboutOption from './sidePanelComponents/about-option';

import data from './data'

import Mailto from './mailto.js';

const SidePanel = (props) => {
  const windowHeight = Math.floor(window.innerHeight);
  const windowWidth = Math.floor(window.innerWidth);
  const [hideOptions, setHide] = useState(false)
  const [hidePortfolioText, setHidePortfolioText] = useState(false)
  const [hideAboutOption, setHideAbout] = useState(false)
  const [hidePortfolioOption, setHidePortfolio] = useState(false)
  const [showAboutText, setShowAboutText] = useState(false)
  const [globShift, setGlobShift] = useState(false)
//   const [openPortfolio, setOpenPortfolio] = useState(false)
//   const [hoveredOptionIdx, setHoveredOption] = useState(null) 


  const [clickMaskEnabled, setClickMask] = useState(false)

  const [undoSequence, beginUndoSequence] = useState(false)
  
  // for About
  const [openAbout, setOpenAbout] = useState(false)
  const [borderRadius, setBorderRadius] = useState('0%')
  const [opacityAmount, setOpacity] = useState(0.01)

  const [outerBlurValue, setOuterBlur] = useState(20)

  const fast = { mass: 11, tension: 180, friction: 120 }
  const slow = { mass: 15, tension: 200, friction: 170 }
  const trans = (x, y) => `translate3d(${x}px,${y}px,0)`
  const calcHeight = (i) => {
      switch(i){
          case 0:
              return openAbout ? Math.floor(windowHeight/1.5) + 'px' : '40px';
          case 1:
              return globShift ? Math.floor(windowHeight/0.75) + 'px' : (openAbout ? Math.floor(windowHeight/1.0) + 'px' : '50px')
          case 2:
              return openAbout ? Math.floor(windowHeight/1.2) + 'px' : '45px'
      }
  }
  const calcWidth = (i) => {
    switch(i){
        case 0:
            return openAbout ? Math.floor(windowHeight/1.5) + 'px' : '120px';
        case 1:
            return globShift ? Math.floor(windowHeight/0.75) + 'px' : (openAbout ? Math.floor(windowHeight/1.0) + 'px' : '150px')
        case 2:
            return openAbout ? Math.floor(windowHeight/1.2) + 'px' : '130px'
    }
  }
  const getOpacity = (i) => {
    // return !removeBlur ? opacityAmount : 0;
    switch(i){
        case 0:
            return undoSequence ? 0 : opacityAmount
        case 1:
            return opacityAmount
        case 2:
            return undoSequence ? 0 : opacityAmount
    }
  }
  const [trail, setTrail] = useTrail(3, () => ({
      opacity: 0.01,
      xy: [0, 0], 
      borderRadius: '0px',
      config: i => (i === 0 ? fast : slow) 
    }))
  


  // for Portfolio

  const [openPortfolio, setOpenPortfolio] = useState(false)
  const [hoveredOptionIdx, setHoveredOption] = useState(null)

  const springRef = useRef()
  const { elHeight, elWidth, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { 
        elHeight: '50px', 
        elWidth: '150px', 
        position: 'relative', 
        paddingTop: '0px',
        top: '0px'
    },
    to: [{ 
        elHeight: openPortfolio ? windowHeight+'px' : '50px', 
        elWidth: openPortfolio ? windowWidth+'px' : '150px', 
        position: openPortfolio ? 'absolute' : 'relative', 
        paddingTop: openPortfolio ? '55px' : '0px',
        top: openPortfolio ? '-120px' : '0px'
    },
    {
        onRest() {
        }
    }]
  }, [hideOptions])

  const transRef = useRef()
  const transitions = useTransition(openPortfolio ? data : [], item => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    onDestroyed: () => {
        // console.log('spring transition destroyed')
    }
  })
  
  useChain(openPortfolio ? [springRef, transRef] : [transRef, springRef], [0, openPortfolio ? 0.1 : 0.6])


//end portfolio

  const handleMaskClick = () => {
    //   console.log('IN MASK CLICK!')
  }
  const handleClick = (i) => {
    console.log('handling i ', i, hideOptions)
        switch(i){
            case 0:
                setOpenAbout(!openAbout)
            break;
            case 1:
                if(openAbout) return
                
                if(openPortfolio === true){
                    setHidePortfolioText(true)
                    setTimeout(() => {
                        props.togglePapaya()
                        setOpenPortfolio(openPortfolio => !openPortfolio);
                        if(hideOptions === true){
                            setHidePortfolioText(true)
                            setTimeout(() => {
                                props.toggleHeaderToRight()
                            }, 500)
                            setTimeout(() => {
                                console.log('inside close??')
                                props.toggleHeaderPosition(false)
                                setHide(hideOptions => !hideOptions)
                                setHideAbout(hideAboutOption => !hideAboutOption)
                            }, 1000)
                        } else {
                            console.log('open!!')
                            setHide(hideOptions => !hideOptions)
                            setHideAbout(hideAboutOption => !hideAboutOption)
                            props.toggleHeaderPosition(true)
                        }
                    }, 500)
                } else {
                    props.togglePapaya()
                    props.toggleHeaderToRight()
                    setOpenPortfolio(openPortfolio => !openPortfolio);
                    setHidePortfolioText(false)
                    if(hideOptions === true){
                        setTimeout(() => {
                            console.log('inside close??')
                            props.toggleHeaderPosition(false)
                            setHide(hideOptions => !hideOptions)
                            setHideAbout(hideAboutOption => !hideAboutOption)
                        }, 1000)
                    } else {
                        console.log('open!!')
                        setHide(hideOptions => !hideOptions)
                        setHideAbout(hideAboutOption => !hideAboutOption)
                        props.toggleHeaderPosition(true)
                    }
                }
            break;
            case 3:
                // console.log('i is 3');
            break;
            case 4:
                // console.log('i is 4');
            break;
        }
    }

    const hoverOn = (i) => {
        console.log('hovered option: ', i)
        if(!openAbout){
            setHoveredOption(i)
        }
    }

    const hoverOff = (i) => {
        console.log('hover off is ', i)
        // setHoveredOption(2)
        if(openPortfolio === false && openAbout === false){
            setHoveredOption(null)
        }
        // if(openAbout === true){
        //     setHoveredOption(i)
        // }
    }

    let options = [
        { name: "About", link: "goAbout", class: 'about'},
        { name: "Portfolio", link: "goPortfolio", class: 'portfolio'},
        // { name: "Music / Art", link: "goArt", class: 'art'},
        { name: "Contact", link: "goContact", class: 'contact'},
        { name: "Follow Me", link: "goFollow", class: 'follow'}
    ]

    
return <div className="side-panel-wrapper">
            {/* <div className={`about-text-container ${showAboutText && 'show-about-text'}`}>
                <div className="about-text">
                I'm a full stack web and game developer
                based out of San Francisco, CA / Vancouver, BC.
                Fluent in JavaScript, Angular, React, NodeJS, and MySQL. <br></br> 
                With experience architecting full stack apps and the ability to quickly integrate into projects at 
                scale, I enjoy interfacing with a team or working on my own. 
                <br></br> <br></br>
                I can clean up a code base with good semantics and best practices, while developing comprehensive test cases.<br></br>
                </div>
            </div> */}
            {options.map((option, i) =>
            {
                switch (option.name) {
                    case 'Portfolio':
                        return <PortfolioOption 
                                key={i}
                                childkey={i}
                                option={option} 
                                handleClick={handleClick}
                                hoverOn={hoverOn}
                                hoverOff={hoverOff}
                                hoveredOptionIdx={hoveredOptionIdx}
                                hideOptions={hideOptions}
                                windowHeight={windowHeight}
                                windowWidth={windowWidth}
                                data={data}
                                hidePortfolioOption={hidePortfolioOption}
                                hidePortfolioText={hidePortfolioText}
                                openPortfolio={openPortfolio}
                                elWidth={elWidth}
                                elHeight={elHeight}
                                rest={rest}
                                ></PortfolioOption>
                    // case 'Music / Art':
                    //     return <MusicArt
                    //             key={i}
                    //             childkey={i}
                    //             option={option} 
                    //             handleClick={handleClick}
                    //             hoverOn={hoverOn}
                    //             hoverOff={hoverOff}
                    //             hoveredOptionIdx={hoveredOptionIdx}
                    //             hideOptions={hideOptions}
                    //             windowHeight={windowHeight}
                    //             windowWidth={windowWidth}
                    //             data={data}
                    //             hidePortfolioOption={hidePortfolioOption}
                    //             hidePortfolioText={hidePortfolioText}
                    //             openPortfolio={openPortfolio}
                    //             elWidth={elWidth}
                    //             elHeight={elHeight}
                    //             rest={rest}
                    //             ></MusicArt>
                    case 'About':
                        return <AboutOption
                        key={i}
                        toggle={true}
                        option={option}
                        handleClick={handleClick}
                        hoverOn={hoverOn}
                        hoverOff={hoverOff}
                        hoveredOptionIdx={hoveredOptionIdx}
                        hideOptions={hideOptions} 
                        openAbout={openAbout}
                        >
                        </AboutOption>
                    case 'Contact':
                        return <div 
                            className={`
                            side-panel-option 
                            ${hoveredOptionIdx === i ? 'hoveredOption' : ''} 
                            ${hideOptions ? 'hideOptions' : ''}
                            `} 
                            key={i} 
                            onMouseEnter={() => hoverOn(i)} 
                            onMouseLeave={() => hoverOff(i)} 
                            >
                                <span className="text">{option.name}</span>
                                <span  className={`color ${option.class}`}></span>
                                <Mailto 
                                key={i}  
                                email={'rcraven85@gmail.com'} 
                                subject={'Nice website!'} 
                                />
                            </div>;
                    case 'Follow Me':
                        return <div 
                            className={`
                            side-panel-option 
                            ${hoveredOptionIdx === i ? 'hoveredOption' : ''} 
                            ${hideOptions ? 'hideOptions' : ''}
                            `} 
                            key={i} 
                            onMouseEnter={() => hoverOn(i)} 
                            onMouseLeave={() => hoverOff(i)} 
                            >
                                <span className="text">{option.name}</span>
                                <span  className={`color ${option.class}`}></span>
                                <a style={{
                                    height: '100%',
                                    width: '100%',
                                    display: 'block'
                                    }} 
                                    href="https://twitter.com/pacific_cipher" target="_blank">
                                </a>
                            </div>;
                    default:
                        return <div 
                            className={`
                            side-panel-option 
                            ${hoveredOptionIdx === i ? 'hoveredOption' : ''} 
                            ${hideOptions ? 'hideOptions' : ''}
                            `} 
                            key={i} 
                            onMouseEnter={() => hoverOn(i)} 
                            onMouseLeave={() => hoverOff(i)} 
                            >
                                <span className="text">{option.name}</span>
                                <span  className={`color ${option.class}`}></span>
                            </div>;
                }
            }
            )}
        </div>
}
export default SidePanel