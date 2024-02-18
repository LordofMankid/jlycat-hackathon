import { forwardRef } from "react";
import { Button } from "tamagui";

const LoginButton = (props: any, ref: any) => {

    return <Button onPress={props.onPress} ref={ref}>Login</Button>
}

export default forwardRef(LoginButton);