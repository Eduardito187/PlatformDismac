import React from 'react';  
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { dimLoad } from './../Helpers/GetMobil';

class ProgressDismac extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress : 0,
      EndInterval: props.End
    };
    this.interval = null;
  }

  setProggressInterval(){
    this.interval = setInterval(() => {
      if (this.state.progress >= 1) {
        this.deleteInterval();
      }else{
        this.setState({
          progress: this.state.progress + 0.025
        });
      }
    }, 150);
  }

  deleteInterval(){
    this.state.EndInterval(true);
    clearInterval(this.interval);
  }

  componentDidMount(){
    this.setProggressInterval();
  }

  render() {
    return(
      <ProgressBar progress={this.state.progress} style={{width: dimLoad,borderColor: '#f3f3f3', borderWidth: 1.5, height: 8, borderRadius: 5}} color={"#EC2427"} />
    );
  }
}
export default ProgressDismac;