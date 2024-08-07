import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login as loginApi} from '../../service/apiAuth';
import { useUser } from './useUser';

export function useLogin() {
  const { user } = useUser();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending:isLoading,error } = useMutation({
    mutationFn: ({ email, password }) => loginApi({email,password}),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
      toast.success(`Welcome back ${user.user.user_metadata.role}`)
    },
    onError: (err) => {
      console.log('ERROR', err);
      if(err.message.includes('Network')) toast.error("Check your Network Connection")
        else toast.error('Provided email or password are incorrect');
    },
  });

  console.log(error)
  return { login, isLoading,error };
}
