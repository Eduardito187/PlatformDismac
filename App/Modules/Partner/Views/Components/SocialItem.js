import React, {useState} from 'react';
import { useAssets } from 'expo-asset';
import { Card, Text } from 'react-native-paper';
/** */
import { generateCustomId } from '../../../../Helpers/API';
import { Navigation } from '../../../../Helpers/Nav';
import SocialPicture from '../../../../Components/SocialPicture';
import { Background_White, Border_Radius_0, Content_Center } from '../../../Login/Style/css';

const SocialItem = (props) => {
    const [state, SetState] = React.useState(props.state);
    const [Facebook, SetFacebook] = useAssets(require("./../../../../../assets/Social/Facebook.png"));
    const [Instagram, SetInstagram] = useAssets(require("./../../../../../assets/Social/Instagram.png"));
    const [Linkedin, SetLinkedin] = useAssets(require("./../../../../../assets/Social/Linkedin.png"));
    const [Twitter, SetTwitter] = useAssets(require("./../../../../../assets/Social/Twitter.png"));
    const [Whatsapp, SetWhatsapp] = useAssets(require("./../../../../../assets/Social/Whatsapp.png"));
    const [YouTube, SetYouTube] = useAssets(require("./../../../../../assets/Social/YouTube.png"));

    React.useEffect(() => {
        //
    }, []);
    
    function selectSocial() {
        Navigation("ShowSocial",{"social":state, "TOKEN":props.TOKEN, "socket":null}, props.navigation);
    }

    function selectedPicture(name) {
        switch (name) {
            case "Facebook":
                return Facebook;
            case "Instagram":
                return Instagram;
            case "Linkedin":
                return Linkedin;
            case "Twitter":
                return Twitter;
            case "Whatsapp":
                return Whatsapp;
            case "You Tube":
                return YouTube;
        }
    }

    return(
        <Card key={generateCustomId()} onPress={() => selectSocial()} style={[{width: "100%", height: props.height, marginBottom: 10, marginTop: 10}, Border_Radius_0, Background_White, Content_Center]}>
            <SocialPicture height={props.height} picture={selectedPicture(state.social.name)} social={state.social.name} />
        </Card>
    );
};
export default SocialItem;