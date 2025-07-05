
import { UsersService } from '@gtd/shared';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
    const {
        data: user,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                return await UsersService.getCurrentUserUsersMeGet()
            } catch{
                return null
            }
        }
    });

    return {
        user,
        isLoading,
        isError,
        error
    }
}