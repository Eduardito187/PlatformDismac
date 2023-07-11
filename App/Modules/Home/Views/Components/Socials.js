import React, {useState} from 'react';
/** */
import { Text, View } from 'react-native';
import { useAssets } from 'expo-asset';
import { Background_White, Border_Radius_0, Border_Radius_5, Content_Center, Size_20 } from '../../../Login/Style/css';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-paper';
import { P5, Width_Max } from '../../../Login/Style/style';
import SocialPicture from '../../../../Components/SocialPicture';
import { label_1 } from '../../../Catalog/Style/Two';
import { Navigation } from '../../../../Helpers/Nav';

const Socials = (props) => {
    const [Width, SetWidth] = React.useState(props.width-10);
    const [Facebook, SetFacebook] = useAssets(require("./../../../../../assets/Social/Facebook.png"));
    const [Instagram, SetInstagram] = useAssets(require("./../../../../../assets/Social/Instagram.png"));
    const [Linkedin, SetLinkedin] = useAssets(require("./../../../../../assets/Social/Linkedin.png"));
    const [Twitter, SetTwitter] = useAssets(require("./../../../../../assets/Social/Twitter.png"));
    const [Whatsapp, SetWhatsapp] = useAssets(require("./../../../../../assets/Social/Whatsapp.png"));
    const [YouTube, SetYouTube] = useAssets(require("./../../../../../assets/Social/YouTube.png"));

    React.useEffect(() => {
        //
    }, []);

    function selectSocial(item) {
        Navigation("ShowSocial",{"social":item,"TOKEN":props.TOKEN,"socket":null},props.navigation);
    }

    const _renderItem = ({item, index}) => {
        return (
            <Card key={Math.random()+'_Social_'+Math.random()} onPress={() => selectSocial(item)} style={[{width: Width, height: props.height}, Border_Radius_0, Background_White, Content_Center]}>
                <SocialPicture height={props.height} picture={selectedPicture(item.social.name)} social={item.social.name} />
            </Card>
        );
    };

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
        <View style={[Width_Max, P5]}>
            <View style={[Width_Max, P5, Background_White, Border_Radius_5]}>
                <View style={[Width_Max]}>
                    <Text style={label_1}>Redes sociales</Text>
                </View>
                <Carousel data={props.data} renderItem={_renderItem} sliderWidth={Width} itemWidth={Width} />
            </View>
        </View>
    );
};
export default Socials;