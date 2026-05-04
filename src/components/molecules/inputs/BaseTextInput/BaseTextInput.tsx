import type { ColorTokens, InputProps, XStackProps } from "tamagui";

import type { ComponentRef, ForwardedRef, Ref } from "react";

import { Input, Spacer } from "tamagui";
import { BaseTouchable } from "@ksairi-org/ui-touchables";
import { BodyRegularMd, BodyRegularSm } from "@fonts";
import { BaseIcon, BaseIconProps } from "@icons";

type BaseTextInputProps = {
  labelText?: string;
  containerProps?: Omit<
    XStackProps,
    | "alignItems"
    | "borderRadius"
    | "width"
    | "height"
    | "paddingHorizontal"
    | "paddingVertical"
    | "pointer-events"
    | "flexDirection"
  >;
  leftIconProps?: BaseIconProps & { onPress?: () => void };
  rightIconProps?: BaseIconProps & { onPress?: () => void };
  description?: string;
  errormessage?: string;
  hasError?: boolean;
} & Omit<InputProps, "unstyled" | "size"> & {
    placeholderTextColor?: ColorTokens;
  };

const BaseTextInput = (
  {
    labelText,
    containerProps,
    leftIconProps,
    rightIconProps,
    errormessage,
    hasError,
    description,
    ...inputProps
  }: BaseTextInputProps,
  ref?: ForwardedRef<ComponentRef<typeof Input>>,
) => (
  <>
    {labelText ? (
      <>
        <BodyRegularMd color={"$text-body"}>{labelText}</BodyRegularMd>
        <Spacer size={"$xs"} />
      </>
    ) : null}

    <BaseTouchable
      flexDirection={"row"}
      alignItems={"center"}
      pointerEvents={containerProps?.onPress ? "box-only" : "auto"}
      backgroundColor={"$background-body"}
      borderRadius={"$lg"}
      borderColor={errormessage || hasError ? "$text-error" : undefined}
      borderWidth={errormessage || hasError ? 1 : 0}
      {...containerProps}
    >
      {leftIconProps ? (
        <>
          <Spacer size={"$sm"} />
          {leftIconProps.onPress ? (
            <BaseTouchable onPress={leftIconProps.onPress}>
              <BaseIcon {...leftIconProps} />
            </BaseTouchable>
          ) : (
            <BaseIcon {...leftIconProps} />
          )}
        </>
      ) : null}

      <Input
        ref={ref as Ref<ComponentRef<typeof Input>>}
        unstyled={true}
        color={"$text-body"}
        placeholderTextColor={"$text-body"}
        textAlign={"left"}
        paddingVertical={"$sm"}
        paddingHorizontal={"$sm"}
        borderRadius={"$lg"}
        flex={1}
        {...inputProps}
      />

      {rightIconProps ? (
        <>
          {rightIconProps.onPress ? (
            <BaseTouchable onPress={rightIconProps.onPress}>
              <BaseIcon {...rightIconProps} />
            </BaseTouchable>
          ) : (
            <BaseIcon {...rightIconProps} />
          )}
          <Spacer size={"$sm"} />
        </>
      ) : null}
    </BaseTouchable>

    {errormessage ? (
      <>
        <BodyRegularSm color={"$text-error"}>{errormessage}</BodyRegularSm>
        <Spacer size={"$xs"} />
      </>
    ) : null}

    {description ? (
      <>
        <Spacer size={"$xs"} />
        <BodyRegularSm color={"$text-subtle"}>{description}</BodyRegularSm>
      </>
    ) : null}
  </>
);

export { BaseTextInput };
export type { BaseTextInputProps };
