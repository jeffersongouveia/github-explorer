import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import { Title, Form, Repositories } from './styles'
import logoImg from '../../assets/logo.svg'

const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="github Explorer" />

    <Title>
      Explore repositórios no Github
    </Title>

    <Form>
      <input placeholder="Digite o nome do repositório" />

      <button type="submit">
        Pesquisar
      </button>
    </Form>

    <Repositories>
      <a href="teste">
        <img src="https://avatars2.githubusercontent.com/u/12664845?s=460&u=281dbbda2311796bc08b3529a069a39ed076f222&v=4" alt="Jefferson Gouveia" />

        <div>
          <strong>jeffersongouveia/Mnemosine</strong>
          <p>A project developed during my degree.</p>
        </div>

        <FiChevronRight size={20} />
      </a>

      <a href="teste">
        <img src="https://avatars2.githubusercontent.com/u/12664845?s=460&u=281dbbda2311796bc08b3529a069a39ed076f222&v=4" alt="Jefferson Gouveia" />

        <div>
          <strong>jeffersongouveia/Mnemosine</strong>
          <p>A project developed during my degree.</p>
        </div>

        <FiChevronRight size={20} />
      </a>

      <a href="teste">
        <img src="https://avatars2.githubusercontent.com/u/12664845?s=460&u=281dbbda2311796bc08b3529a069a39ed076f222&v=4" alt="Jefferson Gouveia" />

        <div>
          <strong>jeffersongouveia/Mnemosine</strong>
          <p>A project developed during my degree.</p>
        </div>

        <FiChevronRight size={20} />
      </a>
    </Repositories>
  </>
)

export default Dashboard
