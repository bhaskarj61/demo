// @flow

import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native';
import Hyperlink from 'react-native-hyperlink'


/**
 * A React component for displaying text from Laserlike user generated content such as Comments and Posts
 *
 * This is basically a React Text with these speical handling:
 * 1. highlight @mention.
 * 2. hightlight url link and opens the browser when user taps it.
 *
 */

type Props = {
  children: any,
  style: any,
  onUrlPress: Function,
  onUserHandlePress: Function,
}

export default class LLText extends React.PureComponent<Props> {
    constructor(props){
        super(props)
        this.props=props
    }

  renderParagraph(paragraph: string, index: number, lastParagraph: boolean): any {
    var words = paragraph.split(' ');
    if (!lastParagraph) {
      words.push('\n');
    }

    return (words.map((word, i)=>{
      return this.renderWord(word, `${index}:${i}`, i == words.length - 1)
    }));
  }

  renderWord(word: string, index: string, lastWord: boolean): any {
    // const urls = SinppetUtil.extractUrls(`${word} `, true);
    const displayWord = !lastWord ? `${word} ` : word;
    // if (urls && urls.length > 0) {
    //   const url = urls[0]; // word boundary, so must be only one
    //   return (<Text style={[s.word, s.url]} key={index} onPress={()=>this.props.onUrlPress(url)}>{displayWord}</Text>)
    // }
    // else {
      let styles = [s.word];
      if (word.charAt(0) === '@') {
        return (<Text style={{ color: '#102657',fontSize:20 }} key={index} onPress={()=>this.props.onTwitterTagPress(displayWord)}>{displayWord}</Text>);
      }
      if (word.charAt(0) === '#') {
        return (<Text style={{ color: '#102657',fontSize:20 }} key={index} onPress={()=>this.props.onTwitterTagPress(displayWord)}>{displayWord}</Text>);
      }
      return (<Text style={styles} key={index}>{displayWord}</Text>);
    // }
  }

  render() {
    const paragraphs = this.props.value.split('\n');

    return (
     <Hyperlink linkStyle={{ color: "#102657", fontSize: 20 }}  linkDefault={ true }>
      <Text style={this.props.style ? this.props.style : s.text}>
        {paragraphs.map((p, i)=>{
          return this.renderParagraph(p, i, i == paragraphs.length - 1);
        })}
      </Text>
      </Hyperlink>
    )
  }
}

const s = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 19.0,
    letterSpacing: 0.32,
    color: '#494949',
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  word: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  url: {
    color: '#007aff',
    lineHeight: 19.0,
  },
  emoji: {
    fontSize: 13,
    marginTop: 1
  }
})