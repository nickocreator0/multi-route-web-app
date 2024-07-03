<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<html>
<head>
    <title>Fibonacci Calculator</title>
</head>
<body>
<h1>Fibonacci Sequence</h1>

<form action="/fibonacci/calculate" method="post" modelAttribute="fibonacci">
    <label>
        <input type="number" name="number" placeholder="Enter a number">
    </label>
    <button type="submit">Calculate</button>
</form>

<!-- Display error message if input is less than or equal to 0 -->
<c:if test="${not empty input_error}">
    <div id="error">
        <p>${input_error}</p>
    </div>
</c:if>

<div id="result">
    <p th:text="${result}">The Fibonacci number you're looking for is ${result}</p>
</div>

</body>
</html>