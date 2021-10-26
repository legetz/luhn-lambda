output "api_base_url" {
  value       = "${aws_api_gateway_deployment.api_gateway_deployment.invoke_url}"
  description = "The public IP of the API"
}

output "function_name" {
  description = "Name of the Lambda function."
  value = aws_lambda_function.lambda.function_name
}