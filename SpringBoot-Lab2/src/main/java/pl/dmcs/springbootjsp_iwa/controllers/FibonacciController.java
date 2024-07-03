package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;
import pl.dmcs.springbootjsp_iwa.model.Fibonacci;

@Controller
public class FibonacciController {

    public long fibo_series(int n) {
        if (n == 1)
            return 0;
        if(n < 4)
            return 1;

        long prev = 0;
        long curr = 1;

        for (int i = 0; i <= n-2; ++i) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }

        return curr;
    }

    @RequestMapping("/fibonacci")
    public String fibonacci(Model model) {
        return "fibonacci";
    }

    @RequestMapping(value = "/fibonacci/calculate", method = RequestMethod.POST)
    public String calculateFibonacci(@ModelAttribute Fibonacci fibonacci, Model model) {

        // Get the user input from the form
        int userInput = fibonacci.getNumber();


        if (userInput <= 0) {
            model.addAttribute("input_error", "Input should be greater than 0.");
            return "fibonacci";
        }

        // Calculate
        long result = fibo_series(userInput);

        // Add the input to the model
        model.addAttribute("number", userInput);

        // Add the result to the model
        model.addAttribute("result", result);

        // Display the same page where form's placed
        return "fibonacci";
    }
}
