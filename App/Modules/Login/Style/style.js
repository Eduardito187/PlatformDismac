import { windowHeight, windowWidth } from '../../../Helpers/GetMobil';
export const style = {
    container : {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    ViewFixed : {
        zIndex: 100,
        position : "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    containerTransparent : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    circleOne : {
        position: "absolute",
        top: -(windowWidth / 4),
        backgroundColor: "transparent",
        left: -(windowWidth / 4)
    },
    circleTwo : {
        position: "absolute",
        top: -50,
        backgroundColor: "transparent",
        right: -50
    },
    circleTree : {
        position: "absolute",
        bottom: -50,
        backgroundColor: "transparent",
        right: -50
    },
    FloatLogin : {
        position: "absolute",
        zIndex: 100,
        top: 0,
        bottom: 0,
        padding: 10
    },
    TitleContainer : {
        padding: 5, 
        alignItems: "center"
    },
    Title : {
        fontWeight: "800",
        color: "#EC2427",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10
    },
    FontButton : {
        color: "white",
        fontWeight: "900"
    },
    LabelButton : {
        fontWeight: "900",
        borderRadius: 5,
        backgroundColor: "white"
    },
    padding5 : {
        padding : 5
    },
    TextPwd : {
        padding: 5,
        alignItems: "flex-end",
        width: (windowWidth - 30)
    },
    containButton : {
        padding: 5,
        alignItems: "center"
    },
    labelPwd : {
        fontWeight: "700",
        color: "#808080"
    },
    fondoRojo : {
        backgroundColor: "#EC2427"
    },
    fondoPlomo : {
        backgroundColor: "#808080"
    },
    helperText : {
        backgroundColor: "white",
        borderRadius: 5,
        fontWeight: "700",
        marginTop: 3
    },
    FloatSnack : {
        position: "absolute",
        zIndex: 100,
        bottom: 0,
        left: 0,
        right: 0
    }
}
export const STYLE = {
    RegisterContainer : {
        backgroundColor: "#EC2427",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    SECCTION_FORM : {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: (windowHeight * 0.30),
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: (windowWidth * 0.10),
        borderTopRightRadius: (windowWidth * 0.10)
    },
    SECCTION_TITLE : {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: (windowHeight * 0.30),
        backgroundColor: "transparend"
    },
    SECTION_TOP_LEFT: {
        position: "absolute",
        top: (windowWidth * 0.12),
        left: (windowWidth * 0.02)
    },
    SECTION_TOP_RIGHT: {
        position: "absolute",
        top: (windowWidth * 0.12),
        right: (windowWidth * 0.02)
    },
    FONT_PROGRESS: {
        fontWeight: "900",
        color: "#FFFFFF",
        fontSize: 18
    },
    PROGRESS_CIRCLE: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    ABSOLUTE: {
        position: "absolute"
    }
};