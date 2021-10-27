resource "aws_api_gateway_rest_api" "rest_api" {
  name        = "${local.name}"
  description = "API Gateway for ${local.name} lambdas"
}

resource "aws_api_gateway_resource" "api_gateway" {
  rest_api_id = "${aws_api_gateway_rest_api.rest_api.id}"
  parent_id   = "${aws_api_gateway_rest_api.rest_api.root_resource_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_api_key" "api_key" {
  name = "api_key_luhn"
}

resource "aws_api_gateway_method" "api_gateway_method" {
  rest_api_id      = "${aws_api_gateway_rest_api.rest_api.id}"
  resource_id      = "${aws_api_gateway_resource.api_gateway.id}"
  http_method      = "GET"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "api_gateway_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.rest_api.id}"
  resource_id = "${aws_api_gateway_method.api_gateway_method.resource_id}"
  http_method = "${aws_api_gateway_method.api_gateway_method.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.lambda.invoke_arn}"
}

resource "aws_api_gateway_method" "api_gateway_root_method" {
  rest_api_id      = "${aws_api_gateway_rest_api.rest_api.id}"
  resource_id      = "${aws_api_gateway_rest_api.rest_api.root_resource_id}"
  http_method      = "GET"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "api_gateway_root_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.rest_api.id}"
  resource_id = "${aws_api_gateway_method.api_gateway_root_method.resource_id}"
  http_method = "${aws_api_gateway_method.api_gateway_root_method.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.lambda.invoke_arn}"
}

resource "aws_api_gateway_deployment" "api_gateway_deployment" {
  depends_on = [
    aws_api_gateway_integration.api_gateway_integration,
    aws_api_gateway_integration.api_gateway_root_integration,
  ]

  rest_api_id = "${aws_api_gateway_rest_api.rest_api.id}"
  stage_name  = "${var.lambda_stage}"
}

resource "aws_api_gateway_usage_plan" "usage_plan" {
  name = "basic"

  api_stages {
    api_id = aws_api_gateway_rest_api.rest_api.id
    stage  = aws_api_gateway_deployment.api_gateway_deployment.stage_name
  }

  quota_settings {
    limit  = 100
    period = "WEEK"
  }

  throttle_settings {
    burst_limit = 10
    rate_limit  = 10
  }
}

resource "aws_api_gateway_usage_plan_key" "usage_plan_key" {
  key_id        = aws_api_gateway_api_key.api_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.usage_plan.id
}
