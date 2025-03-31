import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Sun, Moon } from "@/components/Icons";
import { Appearance, useColorScheme } from "react-native";

export const ThemeSelect = () => {
    const colorScheme = useColorScheme();
    return (
        <Box>
          <Button 
            onPress={() => colorScheme === 'dark' 
              ? Appearance.setColorScheme('light') 
              : Appearance.setColorScheme('dark')} 
            variant="link"
            className="flex-row items-center gap-2"
          >
            {colorScheme === 'dark' ? (
              <>
                <ButtonText className="text-foreground">Light Mode</ButtonText>
                <Sun className="text-foreground" />
              </>
            ) : (
              <>
                <ButtonText className="text-foreground">Dark Mode</ButtonText>
                <Moon className="text-foreground" />
              </>
            )}
          </Button>
        </Box>
    )
}