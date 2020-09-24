import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/all'

import { Header, RepositoryInfo, Issues } from './styles'

import logoImg from '../../assets/logo.svg'

interface RepositoryParams {
  repository: string
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>()

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />

        <Link to="/">
          <FiChevronLeft size={16} /> Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img src="https://avatars0.githubusercontent.com/u/12664845?v=4" alt="Jefferson Gouveia" />

          <div>
            <strong>jeffersongouveia/mnemosine</strong>
            <p>Descrição do repositório</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>178</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>21</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>3</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="hello">
          <div>
            <strong>repository.full_name</strong>
            <p>repository.description</p>
          </div>

          <FiChevronRight size={20} />
        </Link>

        <Link to="hello">
          <div>
            <strong>repository.full_name</strong>
            <p>repository.description</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  )
}

export default Repository
