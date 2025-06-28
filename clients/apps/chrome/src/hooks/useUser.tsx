
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
        queryFn: () => UsersService.getCurrentUserUsersMeGet(),
    });

    return {
        user,
        isLoading,
        isError,
        error
    }
}