class DOMHelper{
    static clearEventListeners(element){
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement
    }

    static moveElement(elementId, newDestinationSelector){
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
        element.scrollIntoView({behavior: 'smooth'});
    }
}

class Component{
    constructor(hostElementId, insertBefore = false){
        if(hostElementId){
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }

        this.insertBefore = insertBefore;
    }

    detach(){
        if(this.element){
            this.element.remove();
        }
    }

    attach(){
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
    }
}

class ToolTip extends Component{
    constructor(closeNotifierFunc, text, hostElementId){
        super(hostElementId);
        this.closeNotifier = closeNotifierFunc;
        this.text = text;
        this.create();
    }

    closeToolTip = () =>{
        this.detach();
        this.closeNotifier();
    }

    create(){
        const toolTipElement = document.createElement('div');
        toolTipElement.className = 'card';
        // toolTipElement.textContent = this.text;
        const toolTipTemplate = document.querySelector('template');
        const toolTipBody = document.importNode(toolTipTemplate.content, true);
        toolTipBody.querySelector('p').textContent = this.text;
        toolTipElement.append(toolTipBody);
        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentElementScrolling = this.hostElement.parentElement.scrollTop;

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;
        toolTipElement.style.position = 'absolute';
        toolTipElement.style.left = x + 'px';
        toolTipElement.style.top = y + 'px';
        toolTipElement.addEventListener('click', this.closeToolTip);
        this.element = toolTipElement;
    }
}

class ProjectItem{
    hasActiveToolTip = false;

    constructor(id,updateProjectListsFunction,type){
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }

    showMoreInfoHandler(){
        if(this.hasActiveToolTip === true) return;
        const prjElement = document.getElementById(this.id);
        const toolTipText = prjElement.dataset.extraInfo;
        const toolTip = new ToolTip(()=>{
            this.hasActiveToolTip = false;
        },toolTipText, this.id);
        toolTip.attach();
        this.hasActiveToolTip = true;
    }

    connectMoreInfoButton(){
        const prjItemElement = document.getElementById(this.id);
        let moreInfoBtn = prjItemElement.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click',this.showMoreInfoHandler.bind(this));
    }

    connectSwitchButton(type){
        const prjItemElement = document.getElementById(this.id);
        let switchBtn = prjItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish': 'Activate';
        switchBtn.addEventListener('click',this.updateProjectListsHandler.bind(null, this.id));
    }

    update(updateProjectListsFn, type){
        this.updateProjectListsHandler = updateProjectListsFn;
        this.connectSwitchButton(type);

    }
}

class ProjectList{
    projects = [];
    constructor(type){
        this.type = type;
        const projectItems = document.querySelectorAll(`#${type}-projects li`);
        for(const prjItem of projectItems){
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this),this.type));
        }
        console.log(this.projects);
    }

    setSwitchHandlerFunction(switchHandlerFunction){
        this.switchHandler = switchHandlerFunction;
    }

    switchProject(projectId){
        // const prjIndex = this.projects.findIndex(p => p.id === projectId);
        // this.projects.splice(prjIndex,1); // this can be used
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p => p.id !== projectId); // this also can be used
    }

    addProject(project){
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this),this.type);
    }
}

class App{
    static init(){
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');
        activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));
        //this.startAnalytics();
        setTimeout(this.startAnalytics, 3000);
        //document.getElementById('startAnalyticsBtn').addEventListener('click',this.startAnalytics);
    }

    static startAnalytics(){
        const analyticsScript = document.createElement('script');
        analyticsScript.src = 'assets/scripts/analytics.js';
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}

App.init();