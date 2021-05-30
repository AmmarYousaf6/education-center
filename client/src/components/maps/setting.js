import React , {useState , useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Slider } from "react-semantic-ui-range"
import { Label, Button, Divider } from "semantic-ui-react"

// we need just one action in this component to update settings made
import { updateSettings } from "../../actions/map_actions"

// to wait for the users input we will add debounce, this is especially useful for "postponing" the geocode requests
import { debounce } from "throttle-debounce";

const SettingsComponent = ({controls , updateSettings}) =>{
  const [filters , setFilters] = useState(controls);
  useEffect(()=>{
    // console.log("Settings Component use effect called" , controls)
    setFilters(controls);
  } , []);
  // we are making settings directly in the controls object which is being passed on to the updateSettings() function up top
  const handleSettings = (settingName, setting)=>{
    let temp = JSON.parse(JSON.stringify(filters) );
    temp[settingName] = setting;
    setFilters(temp);
    debounce(1000 ,  
      updateSettings({
          settings: temp
      })
    );
  }

    // our settings which are needed for the range slider, read more here https://github.com/iozbeyli/react-semantic-ui-range
    const rangeSettings = {
      settings: {
        ...filters.range,
        min: 1,
        step: 1,
        start: filters.range.value,
        // when the slider is moved, we want to update our settings and make sure the maximums align
        onChange: value => {
          let temp = JSON.parse(JSON.stringify(filters) );
          temp.range.value = value;
      
          setFilters(temp);
          debounce(1000 ,  
            updateSettings({
              settings: temp
            }) 
          );
        }
      }
    }
    // we have different kinds of settings in here. The components should be quite self-explanatory. Whenever a button is clicked we call handleSettings() and this way pass on our setting through to our state.
    return (
      <div className="mt3">
        <Divider />
      </div>
    )
}
SettingsComponent.propTypes = {
  controls : PropTypes.object 
};
const mapStateToProps = state => ({
  controls : state.Map.settings
});
const mapDispatchToProps = {
  updateSettings
}
export default connect(mapStateToProps, mapDispatchToProps  )( SettingsComponent );
// export default MapComponent;