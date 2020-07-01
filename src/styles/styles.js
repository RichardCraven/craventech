
import { animated } from 'react-spring'
import styled, { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none;
    background: lightblue;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Container = styled(animated.div)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-gap: 25px;
  padding: 25px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`

const Item = styled(animated.div)`
  height: 200px;
  min-width: 100px;
  max-width: 300px;
  border-radius: 5px;
  will-change: transform, opacity;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
`

export { Global, Container, Item }