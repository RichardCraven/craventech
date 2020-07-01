import "../../styles/side-panel.scss"
import { useTransition, useSpring, useChain, useCallback, useTrail, animated, config } from 'react-spring'

import React, { useState, useRef, useEffect } from 'react';
import { Container, Item } from '../../styles/styles'
import doorsAndKeysImage from '../../images/doorsandkeys_screenshot.png'

const ItemTitle = ({showTitle, title}) => {
    const props = useSpring({opacity: showTitle ? 1 : 0, from: {opacity: 0}})
    return (
    <animated.div className="item-title" style={props}>{title}</animated.div>
    )
}
const ItemDescription = ({showDescription, description, hidePortfolioText}) => {
    const props = useSpring({opacity: showDescription ? 1 : 0, from: {opacity: 0}})
    return (
    <animated.div className="item-description" style={props}>{description}</animated.div>
    )
}

const PortfolioOption = (props) => {
    const [showTitle, setShowTitle] = useState(false)

    const hidePortfolioText = props.hidePortfolioText;
  // spring ref
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
        elHeight: props.openPortfolio ? props.windowHeight+'px' : '50px', 
        elWidth: props.openPortfolio ? props.windowWidth+'px' : '150px', 
        position: props.openPortfolio ? 'absolute' : 'relative', 
        paddingTop: props.openPortfolio ? '55px' : '0px',
        top: props.openPortfolio ? '-120px' : '0px'
    },
    {
        onRest() {
            if(props.hidePortfolioText === false && props.openPortfolio === true){
                setTimeout(() => setShowTitle(true), 0)
            } else {
                setShowTitle(false)
            }
        }
    }]
  }, [props.hideOptions])

  // show tiles transtion
  const transRef = useRef()
  const transitions = useTransition(props.openPortfolio ? props.data : [], item => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / props.data.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' }
  })

  // show text transition
const textRef = useRef([])
const [items, set] = useState([])
const textTransitions = useTransition(items, null, {
    from: { opacity: 0, height: 0, innerHeight: 0, transform: 'perspective(600px) rotateX(0deg)', color: '#8fa5b6' },
    enter: [
    { opacity: 1, height: 80, innerHeight: 80 },
    { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
    { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#c23369' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#28b4d7' },
})
  
  useChain(props.openPortfolio ? 
    [springRef, transRef] : 
    [transRef, springRef], 
    [0, props.openPortfolio ? 0.1 : 0.6])

    // React.useEffect(() => { 
    //   console.log('oinside')
    //   setTimeout(() => setShowTitle(true), 2000)
    // });

    const handlePortfolioClick = (key, event) => {
        event.stopPropagation();
        switch(key){
            case 'Doors and Keys':
                // setShowTitle(true)
                window.open('http://www.doorsandkeys.world', '_blank');
            break;
            case 'Cahoots':
                window.open('http://cahoots.live', '_blank')
            break;
            case 'Blooskai':
                window.open('https://blooskai.com', '_blank')
            break;
            case 'Jingle My Monday':
                window.open('http://jinglemymonday.com', '_blank')
            break;
        }
    }


    /// Item Texts

    

    const reset = () => {
        textRef.current.map(clearTimeout)
        textRef.current = []
        set([])
        textRef.current.push(setTimeout(() => set([props.data[0].name, props.data[1].name, props.data[2].name]), 500))
        // textRef.current.push(setTimeout(() => set(['Apples', 'Kiwis']), 5000))
        // textRef.current.push(setTimeout(() => set(['Apples', 'Bananas', 'Kiwis']), 8000))
        console.log('text transitions are ', textTransitions)
    }

    // useEffect(() => void reset(), [])


    return (
        <Container 
        className={`
        side-panel-option 
        ${props.hoveredOptionIdx === 1 ? 'hoveredOption' : ''}
        ${props.hidePortfolioOption ? 'hideOptions' : ''}
        `} 
        style={
            props.option.name === "Portfolio" && 
            { ...props.rest, width: props.elWidth, height: props.elHeight } 
        } 
        onClick={() => props.handleClick(1)} 
        onMouseEnter={() => props.hoverOn(1)} 
        onMouseLeave={() => props.hoverOff(1)} 
        key={props.childkey}
        >
            <span className="text">{props.option.name}</span>
            <span  className={`color ${props.option.class} ${props.openPortfolio ? 'open' : ''}`}></span>
            {transitions.map(({ item, key, props }) => (
                <div className={`
                    item-container
                    ${item.tag}
                    `} key={key}>
                    <ItemTitle showTitle={showTitle}   title={item.name}></ItemTitle>
                    {/* <animated.div className="transitions-item transition-container" >
                        <animated.div style={{ overflow: 'hidden'}}>hello</animated.div>
                    </animated.div> */}
                    
                    <Item 
                    style={ {
                        ...props, background: item.css
                    }} 
                    className={item.className}
                    onClick={handlePortfolioClick.bind(this, key)}
                    >
                    </Item>
                    <ItemDescription showDescription={showTitle} hidePortfolioText={hidePortfolioText} description={item.description}></ItemDescription>
                </div>
            ))}
            
            {/* {textTransitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
                <animated.div className="transitions-item" key={key} style={rest} >
                <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
                </animated.div>
            ))} */}
        </Container>
    )
}

export default PortfolioOption;