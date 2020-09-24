import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface SearchProps {
  hasError: boolean
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3A3A3A;
  max-width: 450px;
  line-height: 56px;
  
  margin-top: 80px;
`

export const Form = styled.form`
  margin-top: 40px;
  max-width: 700px;
`

export const Search = styled.div<SearchProps>`
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    
    color: #3A3A3A;
    border: 2px solid #FFF;
    border-right: 0;
    
    ${(props) => props.hasError && css`
      border-color: #C53030;
    `}
    
    &::placeholder {
      color: #A8A8B3;
    }
  }
  
  button {
    width: 210px;
    height: 70px;
    
    background: #04D361;
    border: 0;
    border-radius: 0 5px 5px 0;
    
    color: #FFF;
    font-weight: bold;
    transition: background-color 0.2s;
    
    &:hover {
      background: ${shade(0.2, '#04D361')};
    }
  }
`

export const Error = styled.span`
  display: block;
  color: #C53030;
  margin-top: 12px;
`

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;
  height: 100%;
  
  a {
    display: flex;
    align-items: center;
  
    background: #FFF;
    border-radius: 5px;
    text-decoration: none;
    
    width: 100%;
    padding: 24px;
    
    transition: transform 0.2s;
    
    & + a {
      margin-top: 16px;
    }
    
    &:hover {
      transform: translateX(10px);
    }
    
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    
    div {
      flex: 1;
      margin: 0 16px;
      
      strong {
        font-size: 20px;
        color: #3D3D4D;
      }
      
      p {
        font-size: 18px;
        color: #A8A8B3;
        margin-top: 4px;
      }
    }
    
    svg {
      margin-left: auto;
      color: #C9C9D4;
    }
  }
`
