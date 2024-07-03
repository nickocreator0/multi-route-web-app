public class FiboSeries {
    public static long fibo_series(int n) {
        long curr_result = 1;
        long prev_result = 0;

        if(n == 1){
            return 0;
        }
        if(n < 4){
            return 1;
        }
        for(int i = 0; i < n - 2; ++i){
            long next_result = curr_result + prev_result;
            prev_result = curr_result;
            curr_result = next_result;
        }

        return curr_result;
    }

    public static void main(String[] args){
        int n = 15;

        System.out.print("Fibo Series:\n");

        // Display the `n`th occurrence in the fibo series
        System.out.print(fibo_series(n+1));

        }
    }