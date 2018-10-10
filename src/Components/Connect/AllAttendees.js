import React, {Component} from 'react';
import {TouchableOpacity,Animated,StyleSheet,Text,View,Image,ScrollView,Dimensions,FlatList} from 'react-native';
import { observer, inject } from 'mobx-react';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const schedule = require('../../Utility/Images.xcassets/ProgramScreen/scheduleIcon.imageset/schedule_nonsel.png')
const scheduleSel = require('../../Utility/Images.xcassets/ProgramScreen/scheduleIcon_sel.imageset/schedule_sel.png')
const myAgenda = require('../../Utility/Images.xcassets/ProgramScreen/agendaIcon.imageset/my_agenda_nonsel.png')
const myAgendaSel = require('../../Utility/Images.xcassets/ProgramScreen/agendaIcon_sel.imageset/my_agenda_sel.png')
const rightArrowIcon = require('../../Utility/Images.xcassets/right_arrow.imageset/arrow.png')
const defaultImage= require("../../Utility/Images/img_placeholder.png");
@inject('store')
@observer
export default class AllAttendees extends Component {

  static navigationOptions = () => ({
    title: 'NILF 2018',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#0f234f',
    },
  });

  state ={
    xOffset : 0,
    scheduleIcon:scheduleSel,
    myAgendaIcon:myAgenda,
    attendeesImage:defaultImage
  }

  //top tab image change on horizontal scroll
  tabActiveImage=()=>{
    this.state.xOffset>screenWidth/3 ? this.setState({scheduleIcon:schedule}) : this.setState({myAgendaIcon:myAgenda})
    this.state.xOffset<screenWidth/3 ? this.setState({scheduleIcon:scheduleSel}) : this.setState({myAgendaIcon:myAgendaSel})
  }

  //top scroll bar animation
  scrollAnimation=()=>{
    this.state.xOffset<=screenWidth/3 ? this.scrollView.scrollTo({x:0,animated:true}) : this.scrollView.scrollTo({x:screenWidth,animated:true})
  }

  componentWillMount(){
    this.props.store.getAttendees()
    alert(JSON.stringify(this.props.store.attendeesDetail))
  }
  render() {
    return (
      <View>
          <View style={styles.header}>
              <TouchableOpacity 
                style = {styles.tabNav}
                onPress={() => {this.scrollView.scrollTo({x:0,animated:true})}}>
                <Image source={this.state.scheduleIcon} />
                <Text style={styles.text}>All Attendees</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style = {styles.tabNav}
                onPress={() => {this.scrollView.scrollToEnd()}}>
                <Image source={this.state.myAgendaIcon} />
                <Text style={styles.text}>My Chat</Text>
              </TouchableOpacity>
          </View>
          <View style={[styles.scrollBar,{left:this.state.xOffset,}]}></View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            scrollEventThrottle={10}
            showsHorizontalScrollIndicator={false}
            ref={scrollView => this.scrollView = scrollView}
            onScroll={ event => { 
              this.setState({xOffset : event.nativeEvent.contentOffset.x*0.5})
              this.tabActiveImage()   }      
            }
            onTouchEnd={event => {
              this.scrollAnimation()
            }}              
          >
            <View style={{width:screenWidth,backgroundColor:'#fff',flex:1}}>
            <FlatList
                 data={this.props.store.attendeesDetail.attendees}
                 extraData={this.state}
                 renderItem={({item}) =>
                  <View style={styles.allAttendeesContainer}>
                  <View style={{flex:25,alignItems:'center'}}>                 
                  <Image
                  style={styles.imageSpeaker}
                  source={item.linkedinPictureUrl==""?this.state.attendeesImage:item.linkedinPictureUrl}/>
                  </View>
                  <View style={{flex:70}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={[styles.textSpeakerDetail,{fontWeight:'bold',color:'#000'}]}>{item.firstName} {item.lastName}</Text>
                  <TouchableOpacity style={styles.inviteBox}><Text style={{color:'green',textAlign:'center'}}>INVITE</Text></TouchableOpacity>
                  </View>
                  <Text style={styles.textSpeakerDetail}>{item.iitglcPosition}</Text>
                  <Text style={styles.textSpeakerDetail}>{item.linkedinIndustry}</Text>
                  </View>              
                  <TouchableOpacity  style={{flex:5,justifyContent:'center',alignItems:'flex-start'}} 
                  onPress={()=>alert('right arrow Icon function')}>
                  <Image
                  source={rightArrowIcon}/>
                  </TouchableOpacity>
                  </View>}
            />
            </View>


            <View style={{width:screenWidth,height:screenHeight,backgroundColor:'#fff',flex:1}}>
                       {/* <FlatList
                 data={}
                 renderItem={({item}) =>
                  <View style={styles.allAttendeesContainer}>
                  <Image
                  style={styles.imageSpeaker}
                  source={{
                    uri: item.image
                  }}/>
                  <View style={{width:'50%'}}>
                  <Text style={[styles.textSpeakerDetail,{fontWeight:'bold',color:'#000'}]}>Muthu Ramalingam</Text>
                  <Text style={styles.textSpeakerDetail}>HelloLead,DexPatent</Text>
                  <Text style={styles.textSpeakerDetail}>Information Technology and Services</Text>
                  </View>
                  <View style={{width:'20%',alignItems:'center'}}>
                  <Text>12.26 pm</Text>
                  <View style={{height:20,width:20,backgroundColor:'#0f234f',borderRadius:50,marginTop:'10%'}}><Text style={{textAlign:'center',color:'#fff'}}>1</Text></View>
                  </View>
                  </View>}
            /> */}
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
header : {
    flexDirection:"row",
    justifyContent:"space-around",
},
text : {
    fontSize:16,
    color:"#0f234f",
    marginLeft:"5%",
},
tabNav:{
  flexDirection:"row",
  padding:"3%",
  paddingLeft:"15%",
  paddingRight:"15%",
},
scrollBar:{
  
    height:3,
    width:screenWidth/2,
    backgroundColor:"#0f234f",
  },
  allAttendeesContainer:{
    height:125,
    flexDirection:'row',
    borderBottomWidth:0.5,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSpeakerDetail:{
      fontSize:16,
  },
  imageSpeaker:{ 
      width: 75,
      marginHorizontal:'3%',
      height: 75, 
      borderRadius: 50,
     },
    inviteBox:{
      marginLeft:'10%',
      height:30,
      width:80,
      borderColor:'green',
      borderRadius:50,
      borderWidth:1,
      justifyContent:'center'}
});