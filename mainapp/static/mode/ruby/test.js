(function(){var r=CodeMirror.getMode({indentUnit:2},"ruby");function e(e){test.mode(e,r,Array.prototype.slice.call(arguments,1))}e("divide_equal_operator","[variable bar] [operator /=] [variable foo]");e("divide_equal_operator_no_spacing","[variable foo][operator /=][number 42]")})();