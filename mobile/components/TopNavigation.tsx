import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { LogOut } from "@/components/Icons"
import { useAuth } from "@/context/AuthContext"


export const TopNavigation = () => {
    const { logout, userInfo } = useAuth();
    return (
        <Box className="w-full flex flex-row justify-between items-center p-4 border-y border-border">
        <Text className="text-foreground">{userInfo?.email}</Text>
        <Button onPress={logout} size="sm">
          <LogOut className="text-foreground" />
        </Button>
      </Box>

    )
}