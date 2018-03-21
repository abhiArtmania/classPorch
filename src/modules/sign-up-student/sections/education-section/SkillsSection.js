import React from 'react'
import {Grid, Dropdown, Input, Button} from 'semantic-ui-react';
import {TutorList} from "../../../../helpers/utils";

class SkillsSection extends React.Component {

    constructor() {
        super();
        this.state = {
            customSkill: "",
            skills: TutorList.map((item, key) => {
                return {
                    key: key,
                    text: item,
                    value: key
                }
            }),
            searchQuery:''
        };
        this.onCustomSkillsChange = this.onCustomSkillsChange.bind(this);
        this.onSkillSubmit = this.onSkillSubmit.bind(this);
        this.searchInputHandle=this.searchInputHandle.bind(this);
    }

    componentDidMount() {
    }

    onCustomSkillsChange(e) {
        this.setState({customSkill: e.target.value})
    }

    onSkillSubmit(e) {
		e.preventDefault();
        const newSkills = {
            key: this.state.skills.length,
            value: this.state.skills.length,
            text: this.state.customSkill
        };
        this.setState({
            customSkill: "",
            skills: [newSkills, ...this.state.skills],
        });
        console.log(this.state)
    }
    searchInputHandle(e)
    {
		this.setState({searchQuery:e.target.value})
	}

    handleAddition = (e, {value}) => {

        if (value.length <= 20) {
            this.setState({
                skills: [{text: value, value}, ...this.state.skills],
            })
        }

    };

    handleChange = (e, {value}) => {
        const skillsNormalized = value.map(x => this.state.skills.filter(y => y.key === x)[0]);
        this.props.onChangeSkills(skillsNormalized)
        var select = document.querySelector('.selectpicker');
        var inner = select.querySelectorAll('.search');
        this.setState({placeholder:""});
        var ta = document.getElementsByClassName("search")[1];
        var r=ta.value;
        ta.value='';
        var res1= document.querySelector( ".sizer" );
        var resm1= document.querySelector( ".sizer" ).innerHTML;
        document.querySelector( ".sizer" ).innerHTML=''
        var resm11= document.querySelector( ".sizer" ).innerHTML;
        this.setState({searchQuery:""})

        };

    renderLabel = label => ({
        color: 'yellow',
        content: `${label.text}`,
    });

    render() {
        const {skills} = this.state;
        const {selectedSkills} = this.props;
        const displayableSkills = selectedSkills.map(x => x.key);
        return (
                <Grid.Row centered>
                  <Grid.Column textAlign='left' width={8}>
                    <Grid.Row centered>
                    {/* <Input name='skills' fluid placeholder='Start typing to search for a skill.' onKeyPress={this.addNewSkill}/> */}
                    <Dropdown
                        options={skills}
                        placeholder="Start typing to search for a skill."
                        search
                        selection
                        fluid
                        multiple
                        className="selectpicker"
                        value={displayableSkills}
                        onAddItem={this.handleAddition}
                        onChange={this.handleChange}
                        renderLabel={this.renderLabel}
                        searchQuery={this.state.searchQuery}
                        onSearchChange={this.searchInputHandle}/>
                      </Grid.Row>
                    <Grid.Row centered>
                      <br/>
                        <span>Custom Skills<br /></span>
                        <input style={{width:"80%"}} fname='last_name' placeholder='Custom Skills'
                               action={{content: "Add Skill", onClick: this.onSkillSubmit}} label="Custom Skills"
                               value={this.state.customSkill}
                               onChange={this.onCustomSkillsChange}/>
                               <button type="button" class="ui olive button" style={{marginLeft:"5px"}}  onClick={this.onSkillSubmit.bind(this)}>Add</button>
                          </Grid.Row>
                    </Grid.Column>
                </Grid.Row>

        );
    }

}


export default SkillsSection;

function capitalize(str = '') {
    if (!str) return;
    return str.trim().split('')
        .map((char, i) => i === 0 ? char.toUpperCase() : char)
        .reduce((final, char) => final += char, '')
}
