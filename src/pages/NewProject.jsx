import { useNavigate } from "react-router-dom";

import ProjectForm from "../project/ProjectForm";

import styles from "./NewProject.module.css";

const NewProject = () => {
  const history = useNavigate();

  const createPost = (project) => {
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        history("/projects",  { message: 'Projeto criado com suceso'});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.newProjectContainer}>
      <h1>Criar projeto</h1>
      <p>Crie o projeto para depois adicionar os serviços</p>
      <ProjectForm btnText="Criar projeto" handleSubmit={createPost} />
    </div>
  );
};

export default NewProject;
