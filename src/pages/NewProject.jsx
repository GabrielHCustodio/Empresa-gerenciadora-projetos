import ProjectForm from "../project/ProjectForm";

import styles from "./NewProject.module.css"

const NewProject = () => {
    return (
        <div className={styles.newProjectContainer}>
            <h1>Criar projeto</h1>
            <p>Crie o projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar projeto"/>
        </div>
    );
}
 
export default NewProject;