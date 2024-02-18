import { YStack, SizableText, Theme, ScrollView, Text, XStack, Button, Square } from 'tamagui';
import MaterialUI from "@expo/vector-icons/MaterialIcons";

function Icon(props: {
    name: React.ComponentProps<typeof MaterialUI>['name'];
    color: string;
}) {
    return <MaterialUI size={28} {...props} />;
}

export default function TabTwoScreen() {
    return (
        <Theme name="dark">
            <YStack backgroundColor={"$blue1"} flex={1} alignItems="center" justifyContent="center">
                <ScrollView space="$space.3">
                    <SizableText size="$6" fontSize={23}>Voter Registration Details</SizableText>
                    <XStack flexWrap="wrap"
                        backgroundColor={"$blue2"}
                        borderRadius={10}
                        borderColor={"$blue6"}
                        borderWidth={1}
                        space="$space.2" width={353}>
                        <YStack width={110} padding={16}>
                            <Text color="white" paddingBottom={16}>Name</Text>
                            <Text color="white" paddingBottom={16}>Date of Birth</Text>
                            <Text color="white">Residental Address</Text>
                        </YStack>
                        <Square
                            flex={1} maxWidth={0.5}
                            backgroundColor={"$blue6"}
                            borderColor={"$blue6"}
                            borderWidth={0.5}>
                        </Square>
                        <YStack paddingLeft={24} padding={16} width={200}>
                            <Text color="white" paddingBottom={16}>Hershey Bae</Text>
                            <Text color="white" paddingBottom={16}>02/16/2002</Text>
                            <Text color="white">251 Walitham St. Lexington, MA 02421</Text>
                        </YStack>
                    </XStack>

                    <SizableText fontSize={20} paddingTop={20}>View My Ballot</SizableText>
                    <XStack space="$space.6" flex={1} alignItems="center" justifyContent="center">
                        <Button
                            backgroundColor={"$blue4"}
                            color={"$blue12"}
                            borderRadius={50}
                            size="$3"
                        >Democratic</Button>
                        <Button
                            backgroundColor={"$blue4"}
                            color={"$blue12"}
                            borderRadius={50}
                            size="$3"
                        >Republican</Button>
                        <Button
                            backgroundColor={"$blue4"}
                            color={"$blue12"}
                            borderRadius={50}
                            size="$3"
                        >Libertarian</Button>
                    </XStack>

                    <SizableText fontSize={20} paddingTop={20}>Voting Location</SizableText>
                    <XStack flexWrap="wrap"
                        backgroundColor={"$blue2"}
                        borderRadius={10}
                        borderColor={"$blue6"}
                        borderWidth={1}
                        space="$space.2" width={353}>
                        <YStack width={110} padding={16}>
                            <Text color="white" paddingBottom={16}>Ward Number</Text>
                            <Text color="white" paddingBottom={16}>Precinct</Text>
                            <Text color="white" paddingBottom={16}>Facility Name</Text>
                            <Text color="white">Address</Text>
                        </YStack>
                        <Square
                            flex={1} maxWidth={0.5}
                            backgroundColor={"$blue6"}
                            borderColor={"$blue6"}
                            borderWidth={0.5}>
                        </Square>
                        <YStack paddingLeft={24} padding={16} width={200}>
                            <Text color="white" paddingBottom={16}>0</Text>
                            <Text color="white" paddingBottom={16}>7</Text>
                            <Text color="white" paddingBottom={16}>Lexington Community Center</Text>
                            <Text color="white">39 Marrett Road Lower Level Exercise Studio</Text>
                        </YStack>
                    </XStack>

                    <SizableText fontSize={20} paddingTop={20}>Voting City/Town Clerk</SizableText>
                    <XStack flexWrap="wrap"
                        backgroundColor={"$blue2"}
                        borderRadius={10}
                        borderColor={"$blue6"}
                        borderWidth={1}
                        space="$space.2" width={353}>
                        <YStack width={110} padding={16}>
                            <Text color="white" paddingBottom={16}>Phone</Text>
                            <Text color="white" paddingBottom={16}>Fax</Text>
                            <Text color="white" paddingBottom={16}>Email</Text>
                            <Text color="white">Address</Text>
                        </YStack>
                        <Square
                            flex={1} maxWidth={0.5}
                            backgroundColor={"$blue6"}
                            borderColor={"$blue6"}
                            borderWidth={0.5}>
                        </Square>
                        <YStack paddingLeft={24} padding={16} width={200}>
                            <Text color="white" paddingBottom={16}>781-698-4558</Text>
                            <Text color="white" paddingBottom={16}>781-891-2754</Text>
                            <Text color="white" paddingBottom={16}>townclerk@lexingtonma.gov</Text>
                            <Text color="white">Office of the Town Clerk 1625 Mass Ave Lexington, MA 02420</Text>
                        </YStack>
                    </XStack>

                    <SizableText fontSize={20} paddingTop={20}>Your Elected Officials</SizableText>
                    <YStack maxWidth={353} borderWidth={1} backgroundColor={"$blue2"}
                        borderColor={"$blue6"} borderRadius={10}>
                        <XStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            borderBottomColor={"$blue6"}
                            borderBottomWidth={1}
                            padding={16} >
                            <YStack paddingRight={250}>
                                <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                <Text color={"$blue11"}>Title</Text>
                            </YStack>
                            <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                        <XStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            borderBottomColor={"$blue6"}
                            borderBottomWidth={1}
                            padding={16} >
                            <YStack paddingRight={250}>
                                <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                <Text color={"$blue11"}>Title</Text>
                            </YStack>
                            <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                        <XStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            borderBottomColor={"$blue6"}
                            borderBottomWidth={1}
                            padding={16} >
                            <YStack paddingRight={250}>
                                <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                <Text color={"$blue11"}>Title</Text>
                            </YStack>
                            <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                        <XStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            borderBottomColor={"$blue6"}
                            borderBottomWidth={1}
                            padding={16} >
                            <YStack paddingRight={250}>
                                <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                <Text color={"$blue11"}>Title</Text>
                            </YStack>
                            <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                        <XStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            borderBottomColor={"$blue6"}
                            borderBottomWidth={1}
                            padding={16} >
                            <YStack paddingRight={250}>
                                <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                <Text color={"$blue11"}>Title</Text>
                            </YStack>
                            <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                        <XStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            borderBottomColor={"$blue6"}
                            borderBottomWidth={1}
                            padding={16} >
                            <YStack paddingRight={250}>
                                <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                <Text color={"$blue11"}>Title</Text>
                            </YStack>
                            <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                        <XStack
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                            borderBottomColor={"$blue6"}
                            borderBottomWidth={1}
                            padding={16} >
                            <YStack paddingRight={250}>
                                <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                <Text color={"$blue11"}>Title</Text>
                            </YStack>
                            <Icon name="chevron-right" color="white"></Icon>
                        </XStack>
                    </YStack>

                    <SizableText fontSize={20} paddingTop={20}>Current District Representatives</SizableText>
                    <XStack
                        borderWidth={1}
                        backgroundColor={"$blue2"}
                        borderColor={"$blue6"}
                        borderRadius={10}>
                        <YStack maxWidth={175} borderRightColor={"$blue6"}>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                borderRightWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                borderRightWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                borderRightWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                borderRightWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderRightWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                        </YStack>

                        {/* 2nd column */}
                        <YStack maxWidth={175}>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                borderColor={"$blue6"}
                                borderBottomWidth={1}
                                padding={16}>
                                <YStack paddingRight={80}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                            <XStack
                                flex={1}
                                alignItems="center"
                                justifyContent="center"
                                padding={16}>
                                <YStack paddingRight={90}>
                                    <Text color={"$blue12"} paddingBottom={4}>Name</Text>
                                    <Text color={"$blue11"}>Title</Text>
                                </YStack>
                                <Icon name="chevron-right" color="white"></Icon>
                            </XStack>
                        </YStack>
                    </XStack>

                    <YStack padding={50} flex={1} alignItems="center" justifyContent="center">
                        <Text color="white">--------- IN DEVELOPMENT ---------</Text>
                    </YStack>
                </ScrollView>
            </YStack >
        </Theme >
    );
}
